import { ListLocator } from '@gamepark/react-game'

export class ElderSpiritCardsRiverLocator extends ListLocator {
  gap = { y: -7 }
  maxCount = 3
  coordinates = {x: -42, y: -3}
  rotateZ = -90
}

export const elderSpiritCardsRiverLocator = new ElderSpiritCardsRiverLocator()
