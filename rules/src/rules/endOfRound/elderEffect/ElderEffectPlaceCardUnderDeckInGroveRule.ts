import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { SpiritCard, spiritCardData, SpiritCardId } from '../../../material/SpiritCard'
import { Memory } from '../../Memory'
import { NextRuleHelper } from '../../helper/NextRuleHelper'
import { RuleId } from '../../RuleId'

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
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      const card = this.material(MaterialType.SpiritCard).getItem(move.itemIndex)
      const data = spiritCardData[(card.id as SpiritCardId).front as SpiritCard]
      const additionalRules: RuleId[] = []
      for (let i = 0; i < data.ruses; i++) additionalRules.push(RuleId.MoveSpirit)
      for (let i = 0; i < data.arcanes; i++) additionalRules.push(RuleId.PlaceArcane)
      if (additionalRules.length > 0) {
        const currentNextRules: RuleId[] = this.remind(Memory.NextRules) ?? []
        this.memorize(Memory.NextRules, [...additionalRules, ...currentNextRules])
      }
      moves.push(...new NextRuleHelper(this.game).nextRule())
    }
    return moves
  }

  get cardOnBottomOfDeck() {
    return this.material(MaterialType.SpiritCard)
      .location(LocationType.PlayerDeck)
      .player(this.player)
      .minBy((item) => item.location.x ?? 0)
  }
}
