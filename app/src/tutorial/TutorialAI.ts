import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules'
import { ArcaneToken, getArcaneTokenValue } from '@gamepark/bloody-grove/material/ArcaneToken'
import { getGroveType } from '@gamepark/bloody-grove/material/GroveCard'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { SpiritCardId, spiritCardData } from '@gamepark/bloody-grove/material/SpiritCard'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { CustomMoveType } from '@gamepark/bloody-grove/rules/CustomMoveType'
import { DruidTransformationHelper } from '@gamepark/bloody-grove/rules/helper/DruidTransformationHelper'
import { GroveHelper } from '@gamepark/bloody-grove/rules/helper/GroveHelper'
import { Memory } from '@gamepark/bloody-grove/rules/Memory'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { sample } from 'es-toolkit'

type Scored = { move: MaterialMove; score: number }

const TOTAL_ARCANE_TOKENS = 12
const TOTAL_DISCARD_TOKENS = 3
const AVERAGE_ARCANE_FORCE = 2.25 // (2+3+4+0)*3 / 12

export const ai = (game: MaterialGame, player: PlayerColor): Promise<MaterialMove[]> => {
  const rules = new BloodyGroveRules(game)
  const legalMoves = rules.getLegalMoves(player)

  if (legalMoves.length === 0) return Promise.resolve([])

  // Always capture observations first — the "send arcane back to reserve" step is a single legal move,
  // and that's exactly the moment the AI sees its own face-up arcane.
  const knowledge = captureVisibleArcanes(rules, player)

  if (legalMoves.length === 1) return Promise.resolve(legalMoves)

  const ruleId = game.rule?.id

  let selected: MaterialMove

  switch (ruleId) {
    case RuleId.ShowArcaneSimultaneous:
    case RuleId.ElderEffectShowArcane:
      selected = pickArcaneRevealMove(rules, player, knowledge, legalMoves)
      break
    case RuleId.ChooseAction:
      selected = chooseAction(rules, player, knowledge, legalMoves)
      break
    case RuleId.PlaceArcane:
      selected = placeArcane(rules, player, knowledge, legalMoves)
      break
    case RuleId.MoveSpirit:
      selected = moveSpirit(rules, player, knowledge, legalMoves)
      break
    case RuleId.TakeSpiritCards:
      selected = takeSpiritCards(rules, legalMoves)
      break
    case RuleId.ElderEffectTakeSpirit:
      selected = takeSpiritCards(rules, legalMoves)
      break
    case RuleId.EndOfRoundReplaceSpirit0:
    case RuleId.EndOfRoundReplaceSpirit1:
    case RuleId.EndOfRoundReplaceSpirit2:
      selected = replaceSpirit(rules, knowledge, legalMoves)
      break
    case RuleId.EndOfRoundTakeElderSpirit0:
    case RuleId.EndOfRoundTakeElderSpirit1:
    case RuleId.EndOfRoundTakeElderSpirit2:
      selected = takeElderSpirit(rules, player, legalMoves, groveIndexFromTakeElderRule(ruleId))
      break
    case RuleId.EndOfRoundSpiritCardsUnderDeck:
      selected = sample(legalMoves)!
      break
    default:
      selected = sample(legalMoves)!
  }

  return Promise.resolve([selected])
}

// ─── Arcane knowledge ───────────────────────────────────────────────────────

// Persisted in the AI's own localStorage (private to the AI's client), not in game state —
// stashing it in game Memory would leak the peeked arcane to the opponent. localStorage matches
// the lifecycle of the framework's tutorial save (also localStorage), so the AI's memory survives
// a tab close just like the tutorial does.
//
// Restart-tutorial semantics: the framework's RestartTutorialButton only removes the gameName
// localStorage key, leaving ours behind. We detect a fresh game lazily — if a currently visible
// arcane's id contradicts the cached id, the cache is from a previous game and is wiped.
const ARCANE_STORAGE_KEY = 'bloody-grove.ai.knownArcanes'

function loadKnownArcanes(player: PlayerColor): Map<number, ArcaneToken> {
  if (typeof localStorage === 'undefined') return new Map()
  const raw = localStorage.getItem(`${ARCANE_STORAGE_KEY}.${player}`)
  if (!raw) return new Map()
  try {
    const parsed = JSON.parse(raw) as Record<string, number>
    const map = new Map<number, ArcaneToken>()
    for (const [k, v] of Object.entries(parsed)) map.set(Number(k), v as ArcaneToken)
    return map
  } catch {
    return new Map()
  }
}

function saveKnownArcanes(player: PlayerColor, map: Map<number, ArcaneToken>): void {
  if (typeof localStorage === 'undefined') return
  const obj: Record<string, ArcaneToken> = {}
  for (const [k, v] of map) obj[k] = v
  localStorage.setItem(`${ARCANE_STORAGE_KEY}.${player}`, JSON.stringify(obj))
}

function clearKnownArcanes(player: PlayerColor): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(`${ARCANE_STORAGE_KEY}.${player}`)
}

// Returns a fresh map of tokenIndex → ArcaneToken combining:
//   - tokens currently face-up in the game (public: discard pile, rotated arcanes on cards, AI's own ShowLayout)
//   - tokens previously seen by the AI in earlier invocations (persisted via localStorage)
// Side effect: persists newly observed tokens for future invocations, and wipes the cache if it's
// detected to be from a previous game (any visible token contradicts the cached value).
function captureVisibleArcanes(rules: BloodyGroveRules, player: PlayerColor): Map<number, ArcaneToken> {
  let known = loadKnownArcanes(player)
  const visibleIndexes = [
    ...rules.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(player).getIndexes(),
    ...rules
      .material(MaterialType.ArcaneToken)
      .location(LocationType.ArcaneOnSpiritCardLayout)
      .filter((item) => item.location.rotation === false)
      .getIndexes(),
    ...rules.material(MaterialType.ArcaneToken).location(LocationType.ArcaneDiscard).getIndexes()
  ]

  for (const idx of visibleIndexes) {
    const item = rules.material(MaterialType.ArcaneToken).getItem(idx)
    if (typeof item?.id === 'number' && known.has(idx) && known.get(idx) !== item.id) {
      clearKnownArcanes(player)
      known = new Map()
      break
    }
  }

  let dirty = false
  for (const idx of visibleIndexes) {
    const item = rules.material(MaterialType.ArcaneToken).getItem(idx)
    if (typeof item?.id === 'number' && known.get(idx) !== item.id) {
      known.set(idx, item.id as ArcaneToken)
      dirty = true
    }
  }
  if (dirty) saveKnownArcanes(player, known)
  return known
}

function knownArcaneValue(knowledge: Map<number, ArcaneToken>, tokenIndex: number): number | undefined {
  const id = knowledge.get(tokenIndex)
  return id !== undefined ? getArcaneTokenValue(id) : undefined
}

function isKnownDiscardToken(knowledge: Map<number, ArcaneToken>, tokenIndex: number): boolean {
  return knowledge.get(tokenIndex) === ArcaneToken.ArcaneTokenDiscard
}

// Estimate the force contribution of all arcanes on a spirit card from this player's perspective.
// Returns 0 if the card is known to be discarded at end of round.
function estimateArcaneForceOnCard(rules: BloodyGroveRules, knowledge: Map<number, ArcaneToken>, cardIndex: number): number {
  const arcanes = rules
    .material(MaterialType.ArcaneToken)
    .location(LocationType.ArcaneOnSpiritCardLayout)
    .parent(cardIndex)
    .getItems()
  if (arcanes.length === 0) return 0

  for (const a of arcanes) {
    const idx = getArcaneTokenIndex(rules, a)
    if (idx !== -1 && isKnownDiscardToken(knowledge, idx)) return 0
  }

  const unknownPool = unknownArcaneValues(rules, knowledge)
  let total = 0
  for (const a of arcanes) {
    if (typeof a.id === 'number') {
      total += getArcaneTokenValue(a.id as ArcaneToken)
      continue
    }
    const idx = getArcaneTokenIndex(rules, a)
    const known = idx !== -1 ? knownArcaneValue(knowledge, idx) : undefined
    if (known !== undefined) {
      total += known
    } else {
      total += unknownPool.expectedValue
    }
  }
  return total
}

function getArcaneTokenIndex(rules: BloodyGroveRules, item: MaterialItem): number {
  const indexes = rules
    .material(MaterialType.ArcaneToken)
    .location(item.location.type)
    .parent(item.location.parent)
    .getIndexes()
  for (const idx of indexes) {
    if (rules.material(MaterialType.ArcaneToken).getItem(idx) === item) return idx
  }
  return -1
}

function unknownArcaneValues(rules: BloodyGroveRules, knowledge: Map<number, ArcaneToken>): { expectedValue: number; discardChance: number } {
  const allTokens = rules.material(MaterialType.ArcaneToken).getItems()
  let knownDiscardCount = 0
  let knownTotalForce = 0
  let knownCount = 0
  allTokens.forEach((item, idx) => {
    let value: number | undefined
    if (typeof item.id === 'number') {
      value = getArcaneTokenValue(item.id as ArcaneToken)
      if (item.id === ArcaneToken.ArcaneTokenDiscard) knownDiscardCount++
    } else if (knowledge.has(idx)) {
      value = getArcaneTokenValue(knowledge.get(idx)!)
      if (knowledge.get(idx) === ArcaneToken.ArcaneTokenDiscard) knownDiscardCount++
    }
    if (value !== undefined) {
      knownTotalForce += value
      knownCount++
    }
  })
  const remainingTokens = TOTAL_ARCANE_TOKENS - knownCount
  const remainingDiscard = TOTAL_DISCARD_TOKENS - knownDiscardCount
  if (remainingTokens <= 0) return { expectedValue: AVERAGE_ARCANE_FORCE, discardChance: 0 }
  const remainingTotalForce = 9 * 3 - knownTotalForce // (2+3+4)*3 = 27 total force in deck
  const expectedValue = Math.max(0, remainingTotalForce / remainingTokens)
  const discardChance = Math.max(0, remainingDiscard / remainingTokens)
  return { expectedValue, discardChance }
}

// ─── Show Arcane / Elder Effect Show Arcane ────────────────────────────────

function pickArcaneRevealMove(
  rules: BloodyGroveRules,
  player: PlayerColor,
  knowledge: Map<number, ArcaneToken>,
  moves: MaterialMove[]
): MaterialMove {
  // First call: pick a token from reserve to put face-up on Show Layout.
  // Second call (single legal move) is handled before reaching here.
  const arcaneInShow = rules.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(player)
  if (arcaneInShow.length > 0) {
    return moves[0]
  }

  // Prefer revealing a token we don't know yet — peeking a known token tells us nothing new.
  const candidates = moves.filter((m) => isMoveItemType(MaterialType.ArcaneToken)(m) && m.location.type === LocationType.ArcaneShowLayout)
  const novel = candidates.filter((m) => isMoveItemType(MaterialType.ArcaneToken)(m) && !knowledge.has(m.itemIndex))
  return sample(novel.length > 0 ? novel : candidates.length > 0 ? candidates : moves)!
}

// ─── Choose Action ──────────────────────────────────────────────────────────

function chooseAction(
  rules: BloodyGroveRules,
  player: PlayerColor,
  knowledge: Map<number, ArcaneToken>,
  moves: MaterialMove[]
): MaterialMove {
  const groveHelper = new GroveHelper(rules.game, player)
  const actualTurn = rules.remind<number>(Memory.ActualTurn)
  const activeGroveIndex = groveHelper.getActualGroveIndex(actualTurn)
  const baseScores = scoreCurrentBoard(rules, player, knowledge)
  const totalRounds = rules.remind<number>(Memory.ActualRound)

  const scored: Scored[] = moves.map((move) => {
    let score = 0
    if (isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
        score = scoreUnderGrove(rules, player, move, activeGroveIndex, baseScores, totalRounds)
      } else if (move.location.type === LocationType.PlayerSpiritNearDruidLayout) {
        score = scoreNearDruid(rules, player, move, activeGroveIndex, baseScores, totalRounds)
      }
    }
    score += Math.random() * 0.1
    return { move, score }
  })

  return selectBestMove(scored)
}

type BoardScores = {
  ownForce: number[]
  oppForce: number[]
  ownMajorities: number
  oppMajorities: number
  noOneMajorities: number
}

function scoreCurrentBoard(rules: BloodyGroveRules, player: PlayerColor, knowledge: Map<number, ArcaneToken>): BoardScores {
  const ownForce = [0, 0, 0]
  const oppForce = [0, 0, 0]
  for (let g = 0; g < 3; g++) {
    ownForce[g] = computeGroveForce(rules, knowledge, player, g)
    oppForce[g] = computeGroveForce(rules, knowledge, opponent(player), g)
  }
  const cubes = rules.material(MaterialType.Cube).location(LocationType.GroveMajority).getItems()
  let ownMajorities = 0
  let oppMajorities = 0
  let noOneMajorities = 0
  for (const cube of cubes) {
    if (cube.location.id === player) ownMajorities++
    else if (cube.location.id === opponent(player)) oppMajorities++
    else noOneMajorities++
  }
  return { ownForce, oppForce, ownMajorities, oppMajorities, noOneMajorities }
}

function opponent(player: PlayerColor): PlayerColor {
  return player === PlayerColor.Black ? PlayerColor.Green : PlayerColor.Black
}

function computeGroveForce(rules: BloodyGroveRules, knowledge: Map<number, ArcaneToken>, target: PlayerColor, groveIndex: number): number {
  const grove = rules.material(MaterialType.GroveCard).getItems()[groveIndex]
  if (!grove?.id) return 0
  const groveType = getGroveType(grove.id)
  const druidType = new DruidTransformationHelper(rules.game, target).getDruidTransformation(target)

  const cardIndexes = rules
    .material(MaterialType.SpiritCard)
    .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === groveIndex)
    .player(target)
    .getIndexes()

  const cardItems = cardIndexes.map((idx) => rules.material(MaterialType.SpiritCard).getItem(idx))

  let force = 0
  for (const cardIdx of cardIndexes) {
    const card = rules.material(MaterialType.SpiritCard).getItem(cardIdx)
    const cardId = (card.id as SpiritCardId)?.front
    if (!cardId) continue
    const data = spiritCardData[cardId]
    force += data.force(cardItems) ?? 0
    force += estimateArcaneForceOnCard(rules, knowledge, cardIdx)
    if (data.type === druidType) force += 1
    if (data.type === groveType) force += 1
  }
  return force
}

function scoreUnderGrove(
  rules: BloodyGroveRules,
  player: PlayerColor,
  move: MaterialMove,
  activeGroveIndex: number,
  base: BoardScores,
  round: number
): number {
  if (!isMoveItemType(MaterialType.SpiritCard)(move)) return 0
  const groveIndex = move.location.id
  if (typeof groveIndex !== 'number') return 0
  const card = rules.material(MaterialType.SpiritCard).getItem(move.itemIndex)
  const cardFront = (card.id as SpiritCardId)?.front
  if (!cardFront) return 0

  const data = spiritCardData[cardFront]
  const grove = rules.material(MaterialType.GroveCard).getItems()[groveIndex]
  if (!grove?.id) return 0
  const groveType = getGroveType(grove.id)
  const druidType = new DruidTransformationHelper(rules.game, player).getDruidTransformation(player)

  const otherCards = rules
    .material(MaterialType.SpiritCard)
    .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === groveIndex)
    .player(player)
    .getItems()

  let forceGain = data.force(otherCards) ?? 0
  if (data.type === druidType) forceGain += 1
  if (data.type === groveType) forceGain += 1

  const newOwnForce = base.ownForce[groveIndex] + forceGain
  const oppForce = base.oppForce[groveIndex]

  let score = 0

  const margin = newOwnForce - oppForce
  if (margin > 0) {
    score += 8 + Math.min(margin, 5)
  } else if (margin === 0) {
    score += 2
  } else {
    score -= 1 + Math.min(-margin, 5) * 0.5
  }

  // Immediate-win check
  const projectedOwnMajorities = base.ownMajorities + (margin > 0 && groveIndex === activeGroveIndex ? 1 : 0)
  if (projectedOwnMajorities >= 3) {
    score += 1000
  }

  // Block opponent immediate win
  if (base.oppMajorities >= 2 && groveIndex === activeGroveIndex && oppForce > newOwnForce) {
    score -= 50
  }
  if (base.oppMajorities >= 2 && groveIndex === activeGroveIndex && newOwnForce >= oppForce) {
    score += 50
  }

  // Domination points
  score += data.dominations(otherCards) * 1.5

  // Arcane symbols on the played card (PlaceArcane sub-rule will fire next).
  score += data.arcanes * 0.6

  // Ruse symbols (flexibility).
  score += data.ruses * 0.4

  // Early-round bias toward Transform when the play isn't strong.
  if (round <= 2 && data.type !== druidType && data.type !== groveType && margin <= 0) {
    score -= 2
  }

  return score
}

function scoreNearDruid(
  rules: BloodyGroveRules,
  player: PlayerColor,
  move: MaterialMove,
  activeGroveIndex: number,
  base: BoardScores,
  round: number
): number {
  if (!isMoveItemType(MaterialType.SpiritCard)(move)) return 0
  const card = rules.material(MaterialType.SpiritCard).getItem(move.itemIndex)
  const cardFront = (card.id as SpiritCardId)?.front
  if (!cardFront) return 0
  const data = spiritCardData[cardFront]
  const druidId = (rules
    .material(MaterialType.SpiritCard)
    .location(LocationType.PlayerDruid)
    .player(player)
    .maxBy((item) => item.location.x ?? 0)
    .getItem()?.id as SpiritCardId | undefined)?.front
  if (!druidId) return 0

  const druidData = spiritCardData[druidId]

  // Recruitment: count incantation matches with druid (depends on side: 0 = right, 1 = left).
  const side = move.location.id
  const spiritIncantations = side === 0 ? data.rightIncantations : data.leftIncantations
  const druidIncantations = side === 0 ? druidData.leftIncantations : druidData.rightIncantations
  const matches = spiritIncantations.filter((x) => druidIncantations.includes(x))

  let score = 0

  // Each recruited elite is worth ~3-4 force points + future flexibility.
  score += matches.length * 3.5

  // Transformation: future druid type.
  const grove1 = rules.material(MaterialType.GroveCard).getItems()[activeGroveIndex]
  const grove2 = rules.material(MaterialType.GroveCard).getItems()[Math.min(activeGroveIndex + 1, 2)]
  const groveTypes = [grove1, grove2].filter(Boolean).map((g) => getGroveType(g!.id))
  if (groveTypes.includes(data.type)) score += 1.5

  // Early game bias.
  if (round <= 2) score += 2

  // Don't skip a critical force play.
  if (base.oppMajorities >= 2) score -= 8

  // Opportunity cost vs same card under active grove.
  score -= 1.5

  return score
}

// ─── Place Arcane ───────────────────────────────────────────────────────────

function placeArcane(
  rules: BloodyGroveRules,
  player: PlayerColor,
  knowledge: Map<number, ArcaneToken>,
  moves: MaterialMove[]
): MaterialMove {
  const passMove = moves.find((m) => isCustomMoveType(CustomMoveType.Pass)(m))
  const placeMoves = moves.filter(
    (m) => isMoveItemType(MaterialType.ArcaneToken)(m) && m.location.type === LocationType.ArcaneOnSpiritCardLayout
  )
  if (placeMoves.length === 0 && passMove) return passMove

  const groveHelper = new GroveHelper(rules.game, player)
  const actualTurn = rules.remind<number>(Memory.ActualTurn)
  const activeGroveIndex = groveHelper.getActualGroveIndex(actualTurn)
  const base = scoreCurrentBoard(rules, player, knowledge)

  const scored: Scored[] = placeMoves.map((move) => {
    if (!isMoveItemType(MaterialType.ArcaneToken)(move)) return { move, score: 0 }
    const tokenIdx = move.itemIndex
    const targetCardIdx = move.location.parent
    if (typeof targetCardIdx !== 'number') return { move, score: 0 }

    const targetCard = rules.material(MaterialType.SpiritCard).getItem(targetCardIdx)
    const targetGrove = targetCard.location.id
    const targetPlayer = targetCard.location.player
    if (typeof targetGrove !== 'number') return { move, score: 0 }

    const known = knownArcaneValue(knowledge, tokenIdx)
    const isOpponentCard = targetPlayer !== player
    const margin = base.ownForce[targetGrove] - base.oppForce[targetGrove]

    let score
    if (known !== undefined) {
      if (known === 0) {
        if (isOpponentCard && margin < 0) {
          score = 25 // sabotage opportunity
        } else {
          score = -50
        }
      } else {
        if (!isOpponentCard) {
          score = known * (targetGrove === activeGroveIndex ? 3 : 1.5)
          if (-margin < known) score += 5 // tips the balance
        } else {
          score = -known * 4
        }
      }
    } else {
      const pool = unknownArcaneValues(rules, knowledge)
      if (!isOpponentCard) {
        score = (1 - pool.discardChance) * pool.expectedValue * (targetGrove === activeGroveIndex ? 2.5 : 1.2)
        score -= pool.discardChance * 6
        if (margin < 0 && targetGrove === activeGroveIndex) score += 3
      } else {
        score = -pool.expectedValue * 1.5
      }
    }
    return { move, score }
  })

  const best = scored.reduce<Scored | undefined>((acc, s) => (acc === undefined || s.score > acc.score ? s : acc), undefined)
  if (passMove && (!best || best.score <= 0)) return passMove
  return best ? best.move : sample(moves)!
}

// ─── Move Spirit (Ruse) ─────────────────────────────────────────────────────

function moveSpirit(
  rules: BloodyGroveRules,
  player: PlayerColor,
  knowledge: Map<number, ArcaneToken>,
  moves: MaterialMove[]
): MaterialMove {
  const passMove = moves.find((m) => isCustomMoveType(CustomMoveType.Pass)(m))
  const moveMoves = moves.filter((m) => isMoveItemType(MaterialType.SpiritCard)(m))
  if (moveMoves.length === 0 && passMove) return passMove

  const groveHelper = new GroveHelper(rules.game, player)
  const actualTurn = rules.remind<number>(Memory.ActualTurn)
  const activeGroveIndex = groveHelper.getActualGroveIndex(actualTurn)
  const base = scoreCurrentBoard(rules, player, knowledge)

  const scored: Scored[] = moveMoves.map((move) => {
    if (!isMoveItemType(MaterialType.SpiritCard)(move)) return { move, score: 0 }
    const card = rules.material(MaterialType.SpiritCard).getItem(move.itemIndex)
    const fromGrove = card.location.id
    const toGrove = move.location.id
    if (typeof fromGrove !== 'number' || typeof toGrove !== 'number') return { move, score: 0 }
    const cardFront = (card.id as SpiritCardId)?.front
    if (!cardFront) return { move, score: 0 }
    const data = spiritCardData[cardFront]
    const force = data.force([])

    const fromGain = base.ownForce[fromGrove] - base.oppForce[fromGrove]
    const toGain = base.ownForce[toGrove] - base.oppForce[toGrove]

    let score = 0
    if (fromGain > 2 && toGain < 0 && Math.abs(toGain) <= force + 2) score += 8
    if (fromGrove === activeGroveIndex && fromGain >= 0) score -= 4
    if (toGrove === activeGroveIndex && toGain < 0) score += 5
    return { move, score }
  })

  const best = scored.reduce<Scored | undefined>((acc, s) => (acc === undefined || s.score > acc.score ? s : acc), undefined)
  if (passMove && (!best || best.score <= 0)) return passMove
  return best ? best.move : sample(moves)!
}

// ─── Take Spirit Cards (after Druid recruitment / Elder effect) ─────────────

function takeSpiritCards(rules: BloodyGroveRules, moves: MaterialMove[]): MaterialMove {
  const handMoves = moves.filter((m) => isMoveItemType(MaterialType.SpiritCard)(m) && m.location.type === LocationType.PlayerHand)
  const deckTopMoves = moves.filter(
    (m) => isMoveItemType(MaterialType.SpiritCard)(m) && m.location.type === LocationType.PlayerDeck && m.location.x === undefined
  )
  const deckBottomMoves = moves.filter(
    (m) => isMoveItemType(MaterialType.SpiritCard)(m) && m.location.type === LocationType.PlayerDeck && m.location.x === 0
  )

  // ElderEffectTakeSpirit only allows deck moves (no hand). Use deck top by default.
  if (handMoves.length === 0 && deckTopMoves.length > 0) return sample(deckTopMoves)!
  if (handMoves.length === 0 && deckBottomMoves.length > 0) return sample(deckBottomMoves)!

  // Prefer hand placement so we can play the elite this round.
  const round = rules.remind<number>(Memory.ActualRound)
  if (round <= 2 && handMoves.length > 0) return sample(handMoves)!
  if (handMoves.length > 0) return sample(handMoves)!
  return sample(moves)!
}

// ─── End of Round: Replace Spirit (after taking an Elder) ──────────────────

function replaceSpirit(rules: BloodyGroveRules, knowledge: Map<number, ArcaneToken>, moves: MaterialMove[]): MaterialMove {
  const scored: Scored[] = moves.map((move) => {
    if (!isCustomMoveType(CustomMoveType.ReplaceSpirit)(move)) return { move, score: 0 }
    const cardIdx = move.data?.index
    if (typeof cardIdx !== 'number') return { move, score: 0 }
    const card = rules.material(MaterialType.SpiritCard).getItem(cardIdx)
    const cardFront = (card.id as SpiritCardId)?.front
    if (!cardFront) return { move, score: 0 }
    const data = spiritCardData[cardFront]
    const force = data.force([])
    const arcaneForce = estimateArcaneForceOnCard(rules, knowledge, cardIdx)
    return { move, score: -(force + arcaneForce + data.dominations([]) * 1.5) }
  })
  return selectBestMove(scored)
}

// ─── End of Round: Take Elder Spirit from River ────────────────────────────

function takeElderSpirit(rules: BloodyGroveRules, player: PlayerColor, moves: MaterialMove[], groveIndex: number): MaterialMove {
  const otherCardsInGrove = rules
    .material(MaterialType.SpiritCard)
    .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === groveIndex)
    .player(player)
    .getItems()

  const scored: Scored[] = moves.map((move) => {
    if (!isMoveItemType(MaterialType.SpiritCard)(move)) return { move, score: 0 }
    const card = rules.material(MaterialType.SpiritCard).getItem(move.itemIndex)
    const cardFront = (card.id as SpiritCardId)?.front
    if (!cardFront) return { move, score: 0 }
    const data = spiritCardData[cardFront]
    const dominations = data.dominations(otherCardsInGrove) ?? 0
    const force = data.force(otherCardsInGrove) ?? 0
    return { move, score: dominations * 3 + force }
  })
  return selectBestMove(scored)
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function selectBestMove(scored: Scored[]): MaterialMove {
  if (scored.length === 0) throw new Error('No moves to select from')
  if (scored.length === 1) return scored[0].move
  const max = Math.max(...scored.map((s) => s.score))
  const top = scored.filter((s) => s.score >= max - 0.001)
  return sample(top)!.move
}

function groveIndexFromTakeElderRule(ruleId: RuleId | undefined): number {
  switch (ruleId) {
    case RuleId.EndOfRoundTakeElderSpirit0:
      return 0
    case RuleId.EndOfRoundTakeElderSpirit1:
      return 1
    case RuleId.EndOfRoundTakeElderSpirit2:
      return 2
    default:
      return 0
  }
}
