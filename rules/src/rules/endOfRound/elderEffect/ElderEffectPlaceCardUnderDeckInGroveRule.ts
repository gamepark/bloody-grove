import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Memory } from '../../Memory'
import { NextRuleHelper } from '../../helper/NextRuleHelper'

export class ElderEffectPlaceCardUnderDeckInGroveRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    return [
      this.cardOnBottomOfDeck.moveItem({
        type: LocationType.PlayerSpiritUnderGroveLayout,
        player: this.player,
        id: this.remind(Memory.GroveToPlaceSpirit)
      })
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      return new NextRuleHelper(this.game).nextRule()
    }
    return []
  }

  get cardOnBottomOfDeck() {
    return this.material(MaterialType.SpiritCard)
      .location(LocationType.PlayerDeck)
      .player(this.player)
      .minBy((item) => item.location.x ?? 0)
  }
}
