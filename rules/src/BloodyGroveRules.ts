import {
  CompetitiveRank,
  FillGapStrategy,
  hideFront,
  hideFrontToOthers,
  hideItemId,
  hideItemIdToOthers,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  ItemMove,
  Location,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PlayMoveContext,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ElderEffectPlaceCardUnderDeckInGroveRule } from './rules/endOfRound/elderEffect/ElderEffectPlaceCardUnderDeckInGroveRule'
import { ElderEffectShowArcaneRule } from './rules/endOfRound/elderEffect/ElderEffectShowArcaneRule'
import { ElderEffectTakeSpiritRule } from './rules/endOfRound/elderEffect/ElderEffectTakeSpiritRule'
import { EndOfRoundSpiritCardsUnderDeckRule } from './rules/endOfRound/EndOfRoundSpiritCardsUnderDeckRule'
import { EndOfRoundReplaceSpirit0Rule } from './rules/endOfRound/replaceSpiritRule/EndOfRoundReplaceSpirit0Rule'
import { EndOfRoundReplaceSpirit1Rule } from './rules/endOfRound/replaceSpiritRule/EndOfRoundReplaceSpirit1Rule'
import { EndOfRoundReplaceSpirit2Rule } from './rules/endOfRound/replaceSpiritRule/EndOfRoundReplaceSpirit2Rule'
import { EndOfRoundResolveGrove0Rule } from './rules/endOfRound/resolveGroveRule/EndOfRoundResolveGrove0Rule'
import { EndOfRoundResolveGrove1Rule } from './rules/endOfRound/resolveGroveRule/EndOfRoundResolveGrove1Rule'
import { EndOfRoundResolveGrove2Rule } from './rules/endOfRound/resolveGroveRule/EndOfRoundResolveGrove2Rule'
import { EndOfRoundRotateArcaneInCards0Rule } from './rules/endOfRound/rotateArcaneInCardsRule/EndOfRoundRotateArcaneInCards0Rule'
import { EndOfRoundRotateArcaneInCards1Rule } from './rules/endOfRound/rotateArcaneInCardsRule/EndOfRoundRotateArcaneInCards1Rule'
import { EndOfRoundRotateArcaneInCards2Rule } from './rules/endOfRound/rotateArcaneInCardsRule/EndOfRoundRotateArcaneInCards2Rule'
import { EndOfRoundTakeElderSpirit0Rule } from './rules/endOfRound/takeElderSpiritRule/EndOfRoundTakeElderSpirit0Rule'
import { EndOfRoundTakeElderSpirit1Rule } from './rules/endOfRound/takeElderSpiritRule/EndOfRoundTakeElderSpirit1Rule'
import { EndOfRoundTakeElderSpirit2Rule } from './rules/endOfRound/takeElderSpiritRule/EndOfRoundTakeElderSpirit2Rule'
import { ArcaneViewedHelper } from './rules/helper/ArcaneViewedHelper'
import { EndOfGameHelper } from './rules/helper/EndOfGameHelper'
import { MoveSpiritRule } from './rules/MoveSpiritRule'
import { PlaceArcaneRule } from './rules/PlaceArcaneRule'
import { PrepareNextRoundRule } from './rules/PrepareNextRoundRule'
import { RuleId } from './rules/RuleId'
import { ShowArcaneSimultaneousRule } from './rules/ShowArcaneSimultaneousRule'
import { TakeSpiritCardsRule } from './rules/TakeSpiritCardsRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class BloodyGroveRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove, PlayerColor>, CompetitiveRank<MaterialGame, MaterialMove, PlayerColor> {
  endOfGameHelper = new EndOfGameHelper(this.game)
  rules = {
    [RuleId.ShowArcaneSimultaneous]: ShowArcaneSimultaneousRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.PlaceArcane]: PlaceArcaneRule,
    [RuleId.MoveSpirit]: MoveSpiritRule,
    [RuleId.PrepareNextRound]: PrepareNextRoundRule,
    [RuleId.TakeSpiritCards]: TakeSpiritCardsRule,
    [RuleId.EndOfRoundSpiritCardsUnderDeck]: EndOfRoundSpiritCardsUnderDeckRule,
    [RuleId.EndOfRoundRotateArcaneInCards0]: EndOfRoundRotateArcaneInCards0Rule,
    [RuleId.EndOfRoundRotateArcaneInCards1]: EndOfRoundRotateArcaneInCards1Rule,
    [RuleId.EndOfRoundRotateArcaneInCards2]: EndOfRoundRotateArcaneInCards2Rule,
    [RuleId.EndOfRoundResolveGrove0]: EndOfRoundResolveGrove0Rule,
    [RuleId.EndOfRoundResolveGrove1]: EndOfRoundResolveGrove1Rule,
    [RuleId.EndOfRoundResolveGrove2]: EndOfRoundResolveGrove2Rule,
    [RuleId.EndOfRoundTakeElderSpirit0]: EndOfRoundTakeElderSpirit0Rule,
    [RuleId.EndOfRoundTakeElderSpirit1]: EndOfRoundTakeElderSpirit1Rule,
    [RuleId.EndOfRoundTakeElderSpirit2]: EndOfRoundTakeElderSpirit2Rule,
    [RuleId.EndOfRoundReplaceSpirit0]: EndOfRoundReplaceSpirit0Rule,
    [RuleId.EndOfRoundReplaceSpirit1]: EndOfRoundReplaceSpirit1Rule,
    [RuleId.EndOfRoundReplaceSpirit2]: EndOfRoundReplaceSpirit2Rule,
    [RuleId.ElderEffectPlaceCardUnderDeckInGrove]: ElderEffectPlaceCardUnderDeckInGroveRule,
    [RuleId.ElderEffectShowArcane]: ElderEffectShowArcaneRule,
    [RuleId.ElderEffectTakeSpirit]: ElderEffectTakeSpiritRule
  }

  locationsStrategies = {
    [MaterialType.SpiritCard]: {
      [LocationType.PlayerDruid]: new PositiveSequenceStrategy(),
      [LocationType.BearEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.FoxEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.OwlEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpiritUnderGroveLayout]: new PositiveSequenceStrategy(),
      [LocationType.ElderSpiritCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.ElderSpiritCardsRiver]: new FillGapStrategy()
    },
    [MaterialType.GroveCard]: {
      [LocationType.GrovesRiver]: new PositiveSequenceStrategy()
    },
    [MaterialType.ArcaneToken]: {
      [LocationType.ArcaneReserve]: new FillGapStrategy(),
      [LocationType.ArcaneDiscard]: new PositiveSequenceStrategy(),
      [LocationType.ArcaneOnSpiritCardLayout]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpiritCard]: {
      [LocationType.BearEliteCardsDeck]: hideFront,
      [LocationType.FoxEliteCardsDeck]: hideFront,
      [LocationType.OwlEliteCardsDeck]: hideFront,
      [LocationType.PlayerDeck]: hideFront,
      [LocationType.PlayerHand]: hideFrontToOthers,
      [LocationType.ElderSpiritCardsDeck]: hideFront
    },
    [MaterialType.ArcaneToken]: {
      [LocationType.ArcaneReserve]: hideItemId,
      [LocationType.ArcaneOnSpiritCardLayout]: hideIdIfRotated,
      [LocationType.ArcaneShowLayout]: hideItemIdToOthers
    }
  }

  giveTime(): number {
    return 60
  }

  rankPlayers(playerA: PlayerColor, playerB: PlayerColor): number {
    return this.endOfGameHelper.rankPlayers(playerA, playerB)
  }

  getScore(playerId: number): number | undefined {
    if (this.endOfGameHelper.checkIfWinnerIsDeterminateByScore()) {
      return this.endOfGameHelper.getScore(playerId)
    }
    return undefined
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (tieBreaker === 1) {
      return this.endOfGameHelper.getPlayerTransformations(playerId)
    }
    return undefined
  }

  /**
   * Globally keep the per-player "Arcane tokens viewed" memory up to date, whatever rule triggered the move:
   * an index is remembered when a player secretly looks at a token, and forgotten for everyone once the token
   * is revealed to all (rotated face-up on a Spirit card or sent to the discard). See {@link ArcaneViewedHelper}.
   */
  protected afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): MaterialMove[] {
    this.trackArcaneTokensViewed(move)
    return super.afterItemMove(move, context)
  }

  private trackArcaneTokensViewed(move: ItemMove<PlayerColor, MaterialType, LocationType>): void {
    let indexes: number[]
    let location: Partial<Location<PlayerColor, LocationType>>
    if (isMoveItemType(MaterialType.ArcaneToken)(move)) {
      indexes = [move.itemIndex]
      location = move.location
    } else if (isMoveItemTypeAtOnce(MaterialType.ArcaneToken)(move)) {
      indexes = move.indexes
      location = move.location
    } else {
      return
    }
    const arcaneViewed = new ArcaneViewedHelper(this.game)
    if (location.type === LocationType.ArcaneShowLayout && location.player !== undefined) {
      const player = location.player
      indexes.forEach((index) => arcaneViewed.addViewed(player, index))
    } else if (location.type === LocationType.ArcaneDiscard) {
      indexes.forEach((index) => arcaneViewed.forgetForAll(index))
    }
  }
}

const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
