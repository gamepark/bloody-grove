import { PileLocator } from '@gamepark/react-game'

export class ArcaneReserveLocator extends PileLocator {
  coordinates = { x: -36, y: 20 }
  radius = 5
}

export const arcaneReserveLocator = new ArcaneReserveLocator()
