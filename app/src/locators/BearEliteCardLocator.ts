import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { isPlayerBlack } from './utils.ts'

export class BearEliteCardLocator extends Locator {
  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    return {x: isPlayerBlack(context.player) ? 35 : -33, y: 0}
  }
  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(context.player) ? 90 : -90
  }
}

export const bearEliteCardLocator = new BearEliteCardLocator()
