import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class EndOfRoundSpiritCardsUnderDeckRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove[] {
    return this.material(MaterialType.SpiritCard)
      .location(LocationType.PlayerHand)
      .player(player)
      .moveItems(({ location }) => ({
        type: LocationType.PlayerDeck,
        player: location.player,
        x: 0
      }))
  }
  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SpiritCard)(move) && move.location.type === LocationType.PlayerDeck) {
      const cardsInHand = this.material(MaterialType.SpiritCard).location(LocationType.PlayerHand).player(move.location.player!).length
      if (cardsInHand === 0) {
        return [this.endPlayerTurn(move.location.player!)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.startSimultaneousRule(RuleId.EndOfRoundRotateArcaneInCards0)]
  }
}
