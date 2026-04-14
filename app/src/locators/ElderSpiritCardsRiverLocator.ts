import { Locator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class ElderSpiritCardsRiverLocator extends Locator {

  getCoordinates(location: Location<number, number>): Partial<Coordinates> {
    switch (location.x) {
      case 0: return {x: 32, y: 6}
      case 1: return {x: 32, y: 15}
      default: return {x: 39, y: 15}
    }
  }
}

export const elderSpiritCardsRiverLocator = new ElderSpiritCardsRiverLocator()
