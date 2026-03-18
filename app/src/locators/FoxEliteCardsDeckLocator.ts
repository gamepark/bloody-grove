import { DeckLocator } from '@gamepark/react-game'

export class FoxEliteCardsDeckLocator extends DeckLocator {
  coordinates = {x: 45, y: -8}
  rotateZ = 90
}

export const foxEliteCardsDeckLocator = new FoxEliteCardsDeckLocator()
