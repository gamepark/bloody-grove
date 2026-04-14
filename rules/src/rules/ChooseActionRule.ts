import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DruidTransformationHelper } from './helper/DruidTransformationHelper'
import { GroveHelper } from './helper/GroveHelper'
import { SpiritCardHelper } from './helper/SpiritCardHelper'
import { Memory } from './Memory'

export class ChooseActionRule extends PlayerTurnRule {
  groveHelper = new GroveHelper(this.game)
  spiritCardHelper = new SpiritCardHelper(this.game)
  druidTransformationHelper = new DruidTransformationHelper(this.game)

  onRuleStart(): MaterialMove[] {
    const actualTurn = this.memorize(Memory.ActualTurn, (lastValue) => lastValue + 1)
    const cube = this.material(MaterialType.Cube).location(LocationType.RoundPiste)
    if (cube.getItem()!.location.id !== actualTurn) {
      return [cube.moveItem(({ location }) => ({ ...location, id: this.remind(Memory.ActualTurn) }))]
    } else {
      return []
    }
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(
      ...this.playerHand.moveItems(() => this.groveHelper.getPossiblePlace())
    )
    this.druidTransformationHelper.getPossiblePlaces().forEach((place) => {
      moves.push(...this.playerHand.moveItems(place))
    })
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
      const item = this.material(MaterialType.SpiritCard).getItem(move.itemIndex)
      moves.push(...this.spiritCardHelper.getSpiritCardUnderGroveAfterItemMove(item.id))
    }
    if (isMoveItem(move) && move.location.type === LocationType.PlayerSpiritNearDruidLayout) {
      const item = this.material(MaterialType.SpiritCard).getItem(move.itemIndex)
      moves.push(...this.spiritCardHelper.getSpiritCardNearToDruidAfterItemMove(item.id, move.location.id))
    }
    return moves
  }

  get playerHand() {
    return this.material(MaterialType.SpiritCard).location(LocationType.PlayerHand).player(this.player)
  }

}
