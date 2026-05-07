import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritCard, spiritCardData } from '../../material/SpiritCard'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class EndOfRoundTakeElderSpiritRule extends PlayerTurnRule {
  groveToPlaceSpirit?: number
  nextRule?: RuleId

  getPlayerMoves(): MaterialMove[] {
    const x = this.material(MaterialType.SpiritCard).location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === this.groveToPlaceSpirit).player(this.player).length
    return this.elderSpiritCards.moveItems({
      type: LocationType.PlayerSpiritUnderGroveLayout,
      player: this.player,
      id: this.groveToPlaceSpirit,
      x
    })
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      const card = this.material(MaterialType.SpiritCard).getItem(move.itemIndex)
      const effects = spiritCardData[card.id.front as SpiritCard].effects
      if (effects) {
        this.memorize(Memory.GroveToPlaceSpirit, this.groveToPlaceSpirit)
        this.memorize(Memory.NextRules, [this.nextRule!, ...effects])
        return new NextRuleHelper(this.game).nextRule()
      }
      return [this.startRule(this.nextRule!)]
    }
    return []
  }

  get elderSpiritCards() {
    return this.material(MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsRiver)
  }
}
