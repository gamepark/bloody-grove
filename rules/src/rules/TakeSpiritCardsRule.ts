import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { Memory } from './Memory'

export class TakeSpiritCardsRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if(this.remind(Memory.SpiritCardsToTake).length === 0) {
      if(this.spiritCardNearToDruid) {
        return this.spiritCardNearToDruid.moveItems({type: LocationType.PlayerDruid, player: this.player})
      }
    }
    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    const spiritCardsToTake: string[] = this.remind(Memory.SpiritCardsToTake)
    if(spiritCardsToTake.includes('bear')) {
      moves.push(this.bearSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    if(spiritCardsToTake.includes('fox')) {
      moves.push(this.foxSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    if(spiritCardsToTake.includes('owl')) {
      moves.push(this.owlSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    return moves
  }

  beforeItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
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

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type !== LocationType.PlayerDruid) {
      if(this.remind(Memory.SpiritCardsToTake).length === 0) {
        if(this.spiritCardNearToDruid) {
          moves.push(...this.spiritCardNearToDruid.moveItems({type: LocationType.PlayerDruid, player: this.player}))
        }
      }
    }
    if(isMoveItem(move) && move.location.type === LocationType.PlayerDruid) {
      moves.push(...new NextRuleHelper(this.game).nextRule())
    }
    return moves
  }

  get spiritCardNearToDruid() {
    return this.material(MaterialType.SpiritCard).location(LocationType.PlayerSpiritNearDruidLayout).player(this.player)
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
