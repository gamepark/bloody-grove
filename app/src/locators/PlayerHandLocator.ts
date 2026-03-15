import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  radius = 80
  maxAngle = 40

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: 25,
      y: index === 0 ? 25 : -25,
      z: 0,
    }
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
