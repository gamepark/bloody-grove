import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { isPlayerBlack } from './utils.ts'

export class ElderSpiritCardsDeckLocator extends DeckLocator {
  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    return {x: isPlayerBlack(context.player) ? -43 : 45, y: isPlayerBlack(context.player) ? 11 : -11}
  }
  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(context.player) ? -90 : 90
  }
}

export const elderSpiritCardsDeckLocator = new ElderSpiritCardsDeckLocator()
