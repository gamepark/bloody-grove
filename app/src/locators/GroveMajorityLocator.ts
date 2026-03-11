import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'

class GroveMajorityLocator extends Locator {
  parentItemType = MaterialType.GroveCard
  coordinates = { z: 1 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    console.log("parent", location.parent)
    return context.rules.material(this.parentItemType).index(location.parent).getItem()
  }

  getPositionOnParent(location: Location) {
    switch (location.id) {
      case 0:
        return { x: 50, y: 15}
      case PlayerColor.Black:
        return { x: 17, y: 15}
      case PlayerColor.Green:
      default:
        return { x: 83, y: 15}
    }
  }

  locationDescription = new GroveMajorityDescription()
}

class GroveMajorityDescription extends DropAreaDescription {
  width = 1.5
  height = 1.5
}

export const groveMajorityLocator = new GroveMajorityLocator()
