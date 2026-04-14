import { isMoveItem, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
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

  onRuleStart(): MaterialMove[] {
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

  afterItemMove(move: ItemMove): MaterialMove[] {
    if(isMoveItem(move) && move.location.type === LocationType.GroveMajority && this.getPlayerWithMajority() !== undefined) {
      return [this.startPlayerTurn(this.nextRuleIfMajority!, this.getPlayerWithMajority()!)]
    }
    return []
  }

  getPlayerWithMajority(): PlayerColor | undefined {
    const forcePlayerBlack = this.groveHelper.calculatePlayerForceForGrove(PlayerColor.Black, this.actualGroveIndex!)
    const forcePlayerGreen = this.groveHelper.calculatePlayerForceForGrove(PlayerColor.Green, this.actualGroveIndex!)
    if(forcePlayerBlack > forcePlayerGreen) {
      return PlayerColor.Black
    }
    if(forcePlayerBlack < forcePlayerGreen) {
      return PlayerColor.Green
    }
    return undefined
  }

}
