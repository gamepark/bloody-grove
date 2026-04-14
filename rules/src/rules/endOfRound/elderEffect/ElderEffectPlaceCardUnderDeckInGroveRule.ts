import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { NextRuleHelper } from '../../helper/NextRuleHelper'
import { Memory } from '../../Memory'

export class ElderEffectPlaceCardUnderDeckInGroveRule extends PlayerTurnRule {

  onRuleStart(): MaterialMove[] {
    return [this.cardOnBottomOfDeck.moveItem({
      type: LocationType.PlayerSpiritUnderGroveLayout,
      player: this.player,
      id: this.remind(Memory.GroveToPlaceSpirit),
    })]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      moves.push(...new NextRuleHelper(this.game).nextRule())
    }
    return moves
  }

  get cardOnBottomOfDeck() {
    return this.material(MaterialType.SpiritCard).location(LocationType.PlayerDeck).player(this.player).minBy(item => item.location.x ?? 0)
  }

}
