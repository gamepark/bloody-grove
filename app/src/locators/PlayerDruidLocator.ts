import { getRelativePlayerIndex, DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerDruidLocator extends DeckLocator {
  gap = { x: 0, y: 0, z: 0 }
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: 0,
      y: index === 0 ? 25 : -25,
      z: 0,
    }
  }
  getRotateZ(location: Location<number, number>, context: MaterialContext<number, number, number>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }
}

export const playerDruidLocator = new PlayerDruidLocator()
