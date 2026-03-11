import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { isPlayerBlack } from './utils.ts'

export class ElderSpiritCardsRiverLocator extends ListLocator {
  maxCount = 3

  getGap(_location: Location<number, number>, context: MaterialContext<number, number, number>): Partial<Coordinates> {
    return { y: isPlayerBlack(context.player) ? -7 : 7 }
  }
  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    return {x: isPlayerBlack(context.player) ? -43 : 45, y: isPlayerBlack(context.player) ? 2 : -2}
  }
  getRotateZ(_location: Location, context: MaterialContext): number {
    return isPlayerBlack(context.player) ? -90 : 90
  }
}

export const elderSpiritCardsRiverLocator = new ElderSpiritCardsRiverLocator()
