import { CustomMove, isCustomMoveType, isMoveItem, ItemMove, Location, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpiritCard, spiritCardData, SpiritCardId } from '../material/SpiritCard'
import { CustomMoveType } from './CustomMoveType'
import { NextRuleHelper } from './helper/NextRuleHelper'

export class PlaceArcaneRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    this.possiblePlaces().forEach((place) => {
      moves.push(...this.arcaneTokens.moveItems(place))
    })
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type === LocationType.ArcaneOnSpiritCardLayout) {
      moves.push(...new NextRuleHelper(this.game).nextRule())
    }
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return new NextRuleHelper(this.game).nextRule()
    }
    return []
  }

  possiblePlaces(): Location[] {
    return this.spiritCardsUnderGrove.map((index) => ({type: LocationType.ArcaneOnSpiritCardLayout, parent: index, rotation: true}))
  }

  get arcaneTokens() {
    return this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)
  }

  get spiritCardsUnderGrove() {
    return this.material(MaterialType.SpiritCard).location(LocationType.PlayerSpiritUnderGroveLayout).filter(item => {
      const id: SpiritCardId = item.id as SpiritCardId
      const type = spiritCardData[id.front as SpiritCard].type
      return (item.location.player !== this.player && type !== 'elder') || item.location.player === this.player
    }).getIndexes()
  }

}
