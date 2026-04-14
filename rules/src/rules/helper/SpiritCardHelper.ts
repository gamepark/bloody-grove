import { isMoveItem, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { spiritCardData, SpiritCardId } from '../../material/SpiritCard'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'


export class SpiritCardHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getSpiritCardUnderGroveAfterItemMove(id: SpiritCardId): MaterialMove[] {
    if(!id.front) return []
    const nextRules = []
    const data = spiritCardData[id.front]
    for(let i = 0; i < data.arcanes; i++) {
      nextRules.push(RuleId.PlaceArcane)
    }
    for(let i = 0; i < data.ruses; i++) {
      nextRules.push(RuleId.MoveSpirit)
    }
    this.memorize(Memory.NextRules, nextRules)
    return new NextRuleHelper(this.game).nextRule()
  }

  replaceEliteCard(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move)) {
      const previousLocation = this.material(MaterialType.SpiritCard).index(move.itemIndex).getItem()?.location
      if(previousLocation) {
        const spiritCardsToTake: string[] = this.remind(Memory.SpiritCardsToTake)
        if(previousLocation.type === LocationType.BearEliteCard) {
          this.memorize(Memory.SpiritCardsToTake, spiritCardsToTake.filter((card) => card !== 'bear'))
          moves.push(this.bearSpiritCardInDeck.moveItem({type: LocationType.BearEliteCard}))
        } else if(previousLocation.type === LocationType.FoxEliteCard) {
          this.memorize(Memory.SpiritCardsToTake, spiritCardsToTake.filter((card) => card !== 'fox'))
          moves.push(this.foxSpiritCardInDeck.moveItem({type: LocationType.FoxEliteCard}))
        } else if(previousLocation.type === LocationType.OwlEliteCard) {
          this.memorize(Memory.SpiritCardsToTake, spiritCardsToTake.filter((card) => card !== 'owl'))
          moves.push(this.owlSpiritCardInDeck.moveItem({type: LocationType.OwlEliteCard}))
        }
      }
    }
    return moves
  }

  get bearSpiritCard() {
    return this.material(MaterialType.SpiritCard).location(LocationType.BearEliteCard)
  }

  get bearSpiritCardInDeck() {
    return this.material(MaterialType.SpiritCard).location(LocationType.BearEliteCardsDeck).maxBy(item => item.location.x ?? 0)
  }

  get foxSpiritCard() {
    return this.material(MaterialType.SpiritCard).location(LocationType.FoxEliteCard)
  }

  get foxSpiritCardInDeck() {
    return this.material(MaterialType.SpiritCard).location(LocationType.FoxEliteCardsDeck).maxBy(item => item.location.x ?? 0)
  }

  get owlSpiritCard() {
    return this.material(MaterialType.SpiritCard).location(LocationType.OwlEliteCard)
  }

  get owlSpiritCardInDeck() {
    return this.material(MaterialType.SpiritCard).location(LocationType.OwlEliteCardsDeck).maxBy(item => item.location.x ?? 0)
  }

  getSpiritCardNearToDruidAfterItemMove(id: SpiritCardId, locationId: number): MaterialMove[] {
    if(!id.front) return []
    const spiritCardsToTake = []
    const spiritData = spiritCardData[id.front]
    const druidId: SpiritCardId = this.material(MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(this.player).maxBy(item => item.location.x ?? 0).getItem()?.id
    if(!druidId?.front) return []
    const druidData = spiritCardData[druidId.front]
    if(locationId === 0) {
      const spiritIncantations = spiritData.rightIncantations
      const druidIncantions = druidData.leftIncantations
      spiritCardsToTake.push(...spiritIncantations.filter(x => druidIncantions.includes(x)));
    } else {
      const spiritIncantations = spiritData.leftIncantations
      const druidIncantions = druidData.rightIncantations
      spiritCardsToTake.push(...spiritIncantations.filter(x => druidIncantions.includes(x)));
    }
    this.memorize(Memory.SpiritCardsToTake, spiritCardsToTake)
    return [this.startRule(RuleId.TakeSpiritCards)]
  }
}
