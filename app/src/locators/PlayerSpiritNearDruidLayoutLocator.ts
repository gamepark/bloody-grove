/** @jsxImportSource @emotion/react */
import { DruidTransformationHelper } from '@gamepark/bloody-grove/rules/helper/DruidTransformationHelper.ts'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId.ts'
import { Locator, DropAreaDescription, MaterialContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerDruidLocator } from './PlayerDruidLocator.ts'

class PlayerSpiritNearDruidLayoutLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const base = playerDruidLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    return {
      y: base.y,
      x: index === 0 ? (location.id === 0 ? base.x - 6.3 : base.x + 6.3) : location.id === 0 ? base.x + 6.3 : base.x - 6.3,
      z: 0
    }
  }
  getRotateZ(location: Location<number, number>, context: MaterialContext<number, number, number>): number {
    return playerDruidLocator.getRotateZ(location, context)
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (context.rules.game.rule?.player !== context.player) return []
    if (context.rules.game.rule?.id !== RuleId.ChooseAction) return []
    return new DruidTransformationHelper(context.rules.game).getPossiblePlaces()
  }

  locationDescription = new PlayerSpiritNearDruidLayoutLocatorDescription()
}

export class PlayerSpiritNearDruidLayoutLocatorDescription extends DropAreaDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1
}

export const playerSpiritNearDruidLayoutLocator = new PlayerSpiritNearDruidLayoutLocator()
