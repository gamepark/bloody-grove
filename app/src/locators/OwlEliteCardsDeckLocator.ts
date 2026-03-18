import { DeckLocator } from '@gamepark/react-game'

export class OwlEliteCardsDeckLocator extends DeckLocator {
  coordinates = {x: 45, y: 8}
  rotateZ = 90
}

export const owlEliteCardsDeckLocator = new OwlEliteCardsDeckLocator()
