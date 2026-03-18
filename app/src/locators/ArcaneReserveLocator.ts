import { FlexLocator } from '@gamepark/react-game'

export class ArcaneReserveLocator extends FlexLocator {
  gap = { x: 2.5 }
  lineGap = { y: 2.5 }
  lineSize = 4
  maxLines = 4
  coordinates = { x: -45, y: 20 }
}

export const arcaneReserveLocator = new ArcaneReserveLocator()
