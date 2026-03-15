/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

class ArcaneOnSpiritCardLayoutLocator extends ListLocator {
  parentItemType = MaterialType.SpiritCard
  positionOnParent = { x: 50, y: 50 }
  gap = { x: 1.6}

  getPositionOnParent(location: Location<number, number>): XYCoordinates {
    return location.x === undefined ? { x: 50, y: 50 } : { x: 20, y: 20 }
  }

  locationDescription = new ArcaneOnSpiritCardLayoutLocatorDescription()
}

export class ArcaneOnSpiritCardLayoutLocatorDescription extends DropAreaDescription {
  width = 6.3
  height = 8.8
}

export const arcaneOnSpiritCardLayoutLocator = new ArcaneOnSpiritCardLayoutLocator()
