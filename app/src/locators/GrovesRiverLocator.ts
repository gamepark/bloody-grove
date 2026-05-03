import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getContextPlayer, isPlayerBlack } from './utils.ts'

export class GrovesRiverLocator extends ListLocator {
  gap = { x: 10 }
  maxCount = 3
  coordinates = { x: -5, y: 0 }

  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(getContextPlayer(context)) ? -90 : 90
  }
}

export const grovesRiverLocator = new GrovesRiverLocator()
