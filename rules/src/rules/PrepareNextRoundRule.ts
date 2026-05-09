import { isMoveItem, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { EndOfGameHelper } from './helper/EndOfGameHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareNextRoundRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    if (new EndOfGameHelper(this.game).onePlayerHaveAllGroves()) {
      return [this.endGame()]
    }
    const actualRound: number = this.remind(Memory.ActualRound)
    if (actualRound === 4) {
      return [this.endGame()]
    }
    this.memorize(Memory.ActualRound, (lastValue) => lastValue + 1)
    this.memorize(Memory.ActualTurn, 0)
    this.memorize(Memory.FirstPlayer, (lastValue) => (lastValue === PlayerColor.Black ? PlayerColor.Green : PlayerColor.Black))
    const moves: MaterialMove[] = []
    moves.push(...this.discardArcaneTokensInSpiritCard())
    moves.push(...this.deleteElderSpiritCardsInRiver())
    moves.push(...this.reveal3ElderSpiritCards())
    moves.push(...this.playersTakes4Cards())
    moves.push(...this.majorityCubesReturnToCenter())
    moves.push(...this.rotateRoundCardAndResetTurnCube())
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.RoundPiste) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.remind(Memory.FirstPlayer))]
    }
    return []
  }

  discardArcaneTokensInSpiritCard(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const arcaneTokensInSpiritCard = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneOnSpiritCardLayout).rotation(false)
    if (arcaneTokensInSpiritCard.length > 0) {
      moves.push(arcaneTokensInSpiritCard.moveItemsAtOnce({ type: LocationType.ArcaneDiscard }))
    }
    return moves
  }

  deleteElderSpiritCardsInRiver(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const elderCardsInRiver = this.material(MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsRiver)
    if (elderCardsInRiver.length > 0) {
      moves.push(elderCardsInRiver.deleteItemsAtOnce())
    }
    return moves
  }

  reveal3ElderSpiritCards(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const elderCardsInDeck = this.material(MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsDeck).getItems()
    elderCardsInDeck.sort((a, b) => b.location.x! - a.location.x!)
    for (let i = 0; i < 3; i++) {
      moves.push(this.material(MaterialType.SpiritCard).id(elderCardsInDeck[i].id).moveItem({ type: LocationType.ElderSpiritCardsRiver }))
    }
    return moves
  }

  playersTakes4Cards(): MaterialMove[] {
    const moves: MaterialMove[] = []
    this.game.players.forEach((player) => {
      const cardsInPlayerDeck = this.material(MaterialType.SpiritCard).location(LocationType.PlayerDeck).player(player).getItems()
      cardsInPlayerDeck.sort((a, b) => b.location.x! - a.location.x!)
      const nbCards = cardsInPlayerDeck.length >= 4 ? 4 : cardsInPlayerDeck.length
      for (let i = 0; i < nbCards; i++) {
        moves.push(this.material(MaterialType.SpiritCard).id(cardsInPlayerDeck[i].id).moveItem({ type: LocationType.PlayerHand, player }))
      }
    })
    return moves
  }

  majorityCubesReturnToCenter(): MaterialMove[] {
    return this.material(MaterialType.Cube)
      .location((l) => l.type === LocationType.GroveMajority && l.id !== 0)
      .moveItems(({ location }) => ({ ...location, id: 0 }))
  }

  rotateRoundCardAndResetTurnCube(): MaterialMove[] {
    const rotation = this.remind(Memory.FirstPlayer) !== PlayerColor.Black
    return [
      this.material(MaterialType.RoundCard).moveItem(({ location }) => ({ ...location, rotation })),
      this.material(MaterialType.Cube)
        .location(LocationType.RoundPiste)
        .moveItem(({ location }) => ({ ...location, id: 1 }))
    ]
  }
}
