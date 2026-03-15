import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritCard, spiritCardData } from '../../material/SpiritCard'
import { PlayerColor } from '../../PlayerColor'


export class DruidTransformationHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPossiblePlaces(): Location[] {
    return [{
      type: LocationType.PlayerSpiritNearDruidLayout,
      player: this.player,
      id: 0
    },{
      type: LocationType.PlayerSpiritNearDruidLayout,
      player: this.player,
      id: 1
    }]
  }

  getDruidTransformation(player: PlayerColor): string | undefined {
    const druidTransformationId = this.material(MaterialType.SpiritCard)
      .location(LocationType.PlayerDruid)
      .player(player)
      .maxBy(item => item.location.x ?? 0)
      .getItem()
      ?.id

    if(!druidTransformationId.front) return undefined
    return spiritCardData[druidTransformationId.front as SpiritCard].type
  }
}
