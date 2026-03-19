import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getContextPlayer, isPlayerBlack } from './utils.ts'

export class RoundCardLocator extends Locator {
  coordinates = {x: -17, y: 0}

  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(getContextPlayer(context)) ? -90 : 90
  }
}

export const roundCardLocator = new RoundCardLocator()
