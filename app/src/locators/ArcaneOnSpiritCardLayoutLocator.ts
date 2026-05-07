/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { DropAreaDescription, ListLocator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { spiritCardDescription } from '../material/SpiritCardDescription.tsx'

class ArcaneOnSpiritCardLayoutLocator extends ListLocator {
  parentItemType = MaterialType.SpiritCard
  gap = { x: 1.6 }

  getPositionOnParent(location: Location): XYCoordinates {
    return location.x === undefined ? { x: 50, y: 50 } : { x: 20, y: 20 }
  }

  locationDescription = new DropAreaDescription(spiritCardDescription)
}

export const arcaneOnSpiritCardLayoutLocator = new ArcaneOnSpiritCardLayoutLocator()
