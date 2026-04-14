import { FlexLocator } from '@gamepark/react-game'

export class ArcaneReserveLocator extends FlexLocator {
  gap = { x: 2.2 }
  lineGap = { y: 2.2 }
  lineSize = 3
  maxLines = 4
  coordinates = { x: 22.5, y: 2.5 }
}

export const arcaneReserveLocator = new ArcaneReserveLocator()
