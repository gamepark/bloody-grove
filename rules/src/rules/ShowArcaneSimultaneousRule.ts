import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { ArcaneViewedHelper } from './helper/ArcaneViewedHelper'
import { RuleId } from './RuleId'

export class ShowArcaneSimultaneousRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove[] {
    const arcaneInPlayerShowLayout = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(player)
    if (arcaneInPlayerShowLayout.length > 0) {
      return arcaneInPlayerShowLayout.moveItems(({ location }) => ({
        ...location,
        type: LocationType.ArcaneReserve,
        player
      }))
    }
    // The rule requires each player to look at a token different from their opponent's: exclude any
    // token the opponent has already consulted (it stays "viewed" even once back in the reserve).
    const opponent = player === PlayerColor.Black ? PlayerColor.Green : PlayerColor.Black
    const viewedByOpponent = new ArcaneViewedHelper(this.game).getViewed(opponent)
    const availableTokens = this.arcaneTokens.index((index) => !viewedByOpponent.includes(index))
    return availableTokens.moveItems(({ location }) => ({
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
  getMovesAfterPlayersDone(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(this.startPlayerTurn(RuleId.ChooseAction, this.game.players[0]))
    return moves
  }

  get arcaneTokens() {
    return this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)
  }
}
