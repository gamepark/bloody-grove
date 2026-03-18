import { DeckLocator } from '@gamepark/react-game'

export class BearEliteCardsDeckLocator extends DeckLocator {
  coordinates = {x: 45, y: 0}
  rotateZ = 90
}

export const bearEliteCardsDeckLocator = new BearEliteCardsDeckLocator()
