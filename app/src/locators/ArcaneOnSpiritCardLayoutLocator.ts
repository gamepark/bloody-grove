/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { spiritCardDescription } from '../material/SpiritCardDescription.tsx'

class ArcaneOnSpiritCardLayoutLocator extends ListLocator {
  parentItemType = MaterialType.SpiritCard
  gap = { x: 1.6 }

  getPositionOnParent(location: Location): XYCoordinates {
    return location.x === undefined ? { x: 50, y: 50 } : { x: 20, y: 15 }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    try {
      return super.getParentItem(location, context)
    } catch {
      return undefined
    }
  }

  ignore(item: MaterialItem, context: ItemContext): boolean {
    if (item.location.parent !== undefined && !this.getParentItem(item.location, context)) return true
    return super.ignore(item, context)
  }

  locationDescription = new DropAreaDescription(spiritCardDescription)
}

export const arcaneOnSpiritCardLayoutLocator = new ArcaneOnSpiritCardLayoutLocator()
