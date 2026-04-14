import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { NextRuleHelper } from '../../helper/NextRuleHelper'
import { SpiritCardHelper } from '../../helper/SpiritCardHelper'

export class ElderEffectTakeSpiritRule extends PlayerTurnRule {
  spiritCardHelper = new SpiritCardHelper(this.game)

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(this.spiritCardHelper.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.spiritCardHelper.bearSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    moves.push(this.spiritCardHelper.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.spiritCardHelper.foxSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    moves.push(this.spiritCardHelper.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, player: this.player}))
    moves.push(this.spiritCardHelper.owlSpiritCard.moveItem({type: LocationType.PlayerDeck, x: 0, player: this.player}))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    return this.spiritCardHelper.replaceEliteCard(move)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItem(move) && move.location.type === LocationType.PlayerDeck) {
      return new NextRuleHelper(this.game).nextRule()
    }
    return []
  }

}
