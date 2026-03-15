import { CustomMove, isCustomMoveType, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { GroveHelper } from './helper/GroveHelper'
import { NextRuleHelper } from './helper/NextRuleHelper'

export class MoveSpiritRule extends PlayerTurnRule {
  groveHelper = new GroveHelper(this.game)
  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    this.playerSpiritUnderGroves.forEach((index) => {
      const spiritCardGroveIndex = this.material(MaterialType.SpiritCard).getItem(index).location.id
      this.groveHelper.getPossiblePlacesForMove(spiritCardGroveIndex).forEach((place) => {
        moves.push(...this.material(MaterialType.SpiritCard).index(index).moveItems(place))
      }
      )
    })
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
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

  get playerSpiritUnderGroves() {
    return this.material(MaterialType.SpiritCard).location(LocationType.PlayerSpiritUnderGroveLayout).player(this.player).getIndexes()
  }

}
