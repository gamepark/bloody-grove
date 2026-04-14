import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getContextPlayer, isPlayerBlack } from './utils.ts'

export class GrovesRiverLocator extends ListLocator {
  gap = { x: 10 }
  maxCount = 3

  getGap(_location: Location<number, number>, context: MaterialContext<number, number, number>): Partial<Coordinates> {
    return { x: isPlayerBlack(getContextPlayer(context)) ? 10 : -10 }
  }

  getCoordinates(_location: Location, context: MaterialContext): Partial<Location> {
    return { x: isPlayerBlack(getContextPlayer(context)) ? -5 : 15, y: 0 }
  }

  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(getContextPlayer(context)) ? -90 : 90
  }
}

export const grovesRiverLocator = new GrovesRiverLocator()
