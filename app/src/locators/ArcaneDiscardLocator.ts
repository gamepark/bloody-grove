import { FlexLocator } from '@gamepark/react-game'

export class ArcaneDiscardLocator extends FlexLocator {
  gap = { x: 2.2 }
  lineGap = { y: 2.2 }
  lineSize = 3
  maxLines = 4
  coordinates = { x: 22.5, y: 12 }
}

export const arcaneDiscardLocator = new ArcaneDiscardLocator()
