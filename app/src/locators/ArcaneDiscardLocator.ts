import { FlexLocator } from '@gamepark/react-game'

export class ArcaneDiscardLocator extends FlexLocator {
  gap = { x: 2 }
  lineGap = { y: 2 }
  lineSize = 4
  maxLines = 4
  coordinates = { x: -45, y: -25 }
}

export const arcaneDiscardLocator = new ArcaneDiscardLocator()
