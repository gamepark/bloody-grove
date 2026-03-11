import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerDruidLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: 0,
      y: index === 0 ? 20 : -20,
      z: 0,
    }
  }
  getRotateZ(location: Location<number, number>, context: MaterialContext<number, number, number>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }
}

export const playerDruidLocator = new PlayerDruidLocator()
