import { Locator } from '@gamepark/react-game'

export class RoundCardLocator extends Locator {
  coordinates = { x: -17, y: 0 }
  rotateZ = -90
}

export const roundCardLocator = new RoundCardLocator()
