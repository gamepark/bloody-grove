import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { SpiritCardHelper } from './helper/SpiritCardHelper'
import { Memory } from './Memory'

export class TakeSpiritCardsRule extends PlayerTurnRule {
  spiritCardHelper = new SpiritCardHelper(this.game)

  onRuleStart(): MaterialMove[] {
    if(this.remind(Memory.SpiritCardsToTake).length === 0) {
      if(this.spiritCardNearToDruid) {
        return this.spiritCardNearToDruid.moveItems({type: LocationType.PlayerDruid, player: this.player})
      }
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const spiritCardsToTake: string[] = this.remind(Memory.SpiritCardsToTake)
    if(spiritCardsToTake.includes('bear')) {
      moves.push(this.spiritCardHelper.bearSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.spiritCardHelper.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.spiritCardHelper.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    if(spiritCardsToTake.includes('fox')) {
      moves.push(this.spiritCardHelper.foxSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.spiritCardHelper.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.spiritCardHelper.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    if(spiritCardsToTake.includes('owl')) {
      moves.push(this.spiritCardHelper.owlSpiritCard.moveItem({type: LocationType.PlayerHand, player: this.player}))
      moves.push(this.spiritCardHelper.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
      moves.push(this.spiritCardHelper.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return this.spiritCardHelper.replaceEliteCard(move)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
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

}
