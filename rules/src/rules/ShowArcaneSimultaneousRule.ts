import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class ShowArcaneSimultaneousRule extends SimultaneousRule {
    getActivePlayerLegalMoves(player: PlayerColor): MaterialMove[] {
      const arcaneInPlayerShowLayout = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(player)
      if(arcaneInPlayerShowLayout.length > 0) {
        return arcaneInPlayerShowLayout.moveItems(({ location }) => ({
          ...location,
          type: LocationType.ArcaneReserve,
          player
        }))
      }
      return this.arcaneTokens.moveItems(({ location }) => ({
        ...location,
          type: LocationType.ArcaneShowLayout,
          player
        }))
    }
    afterItemMove(move: ItemMove) {
      if (isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneReserve) {
        return [this.endPlayerTurn(move.location.player!)]
      }
      return []
    }
    getMovesAfterPlayersDone(): MaterialMove<number, number, number, number>[] {
      const moves: MaterialMove[] = []
      moves.push(this.startPlayerTurn(RuleId.ChooseAction, this.game.players[0]))
      return moves
    }

    get arcaneTokens()  {
      return this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)
    }

}
