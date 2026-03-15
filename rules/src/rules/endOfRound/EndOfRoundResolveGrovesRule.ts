import { isMoveItem, ItemMove, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { GroveHelper } from '../helper/GroveHelper'
import { RuleId } from '../RuleId'

export class EndOfRoundResolveGrovesRule extends MaterialRulesPart {
  actualGroveIndex?: number
  nextRuleIfEquality?: RuleId
  nextRuleIfMajority?: RuleId
  groveHelper = new GroveHelper(this.game)

  onRuleStart(): MaterialMove<number, number, number, number>[] {
    if(this.getPlayerWithMajority()) {
      return [
        this.material(MaterialType.Cube).location(LocationType.GroveMajority).parent(this.actualGroveIndex).moveItem(
          ({ location }) => ({
            ...location,
            id: this.getPlayerWithMajority()
          })
        )
      ]
    }
    return [this.startRule(this.nextRuleIfEquality!)]
  }

  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number>[] {
    if(isMoveItem(move) && move.location.type === LocationType.GroveMajority && this.getPlayerWithMajority() !== undefined) {
      return [this.startPlayerTurn(this.nextRuleIfMajority!, this.getPlayerWithMajority()!)]
    }
    return []
  }

  getPlayerWithMajority(): PlayerColor | undefined {
    const forcePlayerBlack = this.groveHelper.calculatePlayerForceForGrove(PlayerColor.Black, this.actualGroveIndex!)
    const forcePlayerGreen = this.groveHelper.calculatePlayerForceForGrove(PlayerColor.Green, this.actualGroveIndex!)
    console.log('grove', this.actualGroveIndex)
    console.log('forcePlayerBlack', forcePlayerBlack)
    console.log('forcePlayerGreen', forcePlayerGreen)
    if(forcePlayerBlack > forcePlayerGreen) {
      return PlayerColor.Black
    }
    if(forcePlayerBlack < forcePlayerGreen) {
      return PlayerColor.Green
    }
    return undefined
  }

}
