import { isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritCard, spiritCardData } from '../../material/SpiritCard'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class EndOfRoundTakeElderSpiritRule extends PlayerTurnRule {
  groveToPlaceSpirit?: number
  nextRule?: RuleId

  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    this.possiblePlaces().forEach((place) => {
      moves.push(...this.elderSpiritCards.moveItems(place))
    })
    return moves
  }

  beforeItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      if(move.location.x === undefined) return []
      const cardAlreadyInLocation = this.material(MaterialType.SpiritCard).location(loc => loc.type === move.location.type && loc.id === move.location.id && loc.x === move.location.x).player(move.location.player)
      if(cardAlreadyInLocation.length > 0) {
        const cardIdx = cardAlreadyInLocation.getIndex()
        const arcanesInCard = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneOnSpiritCardLayout).parent(cardIdx)
        if(arcanesInCard.length > 0) {
          moves.push(arcanesInCard.moveItemsAtOnce({ type: LocationType.ArcaneDiscard}))
        }
        moves.push(...cardAlreadyInLocation.deleteItems(1))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    if(isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      const card = this.material(MaterialType.SpiritCard).getItem(move.itemIndex)
      const effects = spiritCardData[card.id.front as SpiritCard].effects
      if(effects) {
        this.memorize(Memory.GroveToPlaceSpirit, this.groveToPlaceSpirit)
        this.memorize(Memory.NextRules, [...effects, this.nextRule!])
        return new NextRuleHelper(this.game).nextRule()
      }
      return [this.startRule(this.nextRule!)]
    }
    return []
  }

  possiblePlaces(): Location[] {
    const locations: Location[] = []
    const spiritCardsUnderGrove = this.material(MaterialType.SpiritCard).location(loc => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === this.groveToPlaceSpirit).player(this.player).getItems()
    spiritCardsUnderGrove.forEach((card) => {
      const type = spiritCardData[card.id.front as SpiritCard].type
      if(type !== 'elder') {
        locations.push(card.location)
      }
    })
    if(locations.length === 0) {
      locations.push({
        type: LocationType.PlayerSpiritUnderGroveLayout,
        player: this.player,
        id: this.groveToPlaceSpirit,
      })
    }
    return locations
  }

  get elderSpiritCards() {
    return this.material(MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsRiver)
  }

}
