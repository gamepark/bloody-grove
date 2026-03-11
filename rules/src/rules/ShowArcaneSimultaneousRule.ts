import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class ShowArcaneSimultaneousRule extends SimultaneousRule {
    getActivePlayerLegalMoves(player: PlayerColor): MaterialMove[] {
      const moves: MaterialMove[] = []
      moves.push(
        ...this.arcaneTokens.moveItems(() => ({
          type: LocationType.ArcaneShowLayout,
          player
        }))
      )
      return moves
    }
    afterItemMove(move: ItemMove) {
      if (isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneShowLayout) {
        return [this.endPlayerTurn(move.location.player!)]
      }
      return []
    }
    getMovesAfterPlayersDone(): MaterialMove<number, number, number, number>[] {
      const moves: MaterialMove[] = []
      const showedArcaneTokens = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout)
      moves.push(
        ...showedArcaneTokens.moveItems(() => ({
          type: LocationType.ArcaneReserve,
        }))
      )
      moves.push(this.startPlayerTurn(RuleId.ChooseAction, this.game.players[0]))
      return moves
    }

    get arcaneTokens()  {
      return this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)
    }

}
