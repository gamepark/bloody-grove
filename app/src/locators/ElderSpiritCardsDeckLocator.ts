import { DeckLocator } from '@gamepark/react-game'

export class ElderSpiritCardsDeckLocator extends DeckLocator {
  coordinates = {x: -42, y: 6}
  rotateZ = -90
}

export const elderSpiritCardsDeckLocator = new ElderSpiritCardsDeckLocator()
