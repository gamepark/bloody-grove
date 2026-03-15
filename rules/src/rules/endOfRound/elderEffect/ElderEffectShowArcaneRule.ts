import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { NextRuleHelper } from '../../helper/NextRuleHelper'

export class ElderEffectShowArcaneRule extends PlayerTurnRule {
  get arcaneTokens() {
    return this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)
  }

  getPlayerMoves(): MaterialMove[] {
    const arcaneInPlayerShowLayout = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(this.player)
    if (arcaneInPlayerShowLayout.length > 0) {
      return arcaneInPlayerShowLayout.moveItems(({ location }) => ({
        ...location,
        type: LocationType.ArcaneReserve,
        player: this.player
      }))
    }
    return this.arcaneTokens.moveItems(({ location }) => ({
      ...location,
      type: LocationType.ArcaneShowLayout,
      player: this.player
    }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneReserve) {
      return new NextRuleHelper(this.game).nextRule()
    }
    return []
  }

}
