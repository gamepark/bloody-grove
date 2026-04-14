import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { NextRuleHelper } from '../../helper/NextRuleHelper'
import { Memory } from '../../Memory'

export class ElderEffectTakeSpiritRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(this.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    moves.push(this.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    moves.push(this.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
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

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type === LocationType.PlayerDeck) {
      moves.push(...new NextRuleHelper(this.game).nextRule())
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

}
