import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getContextPlayer, isPlayerBlack } from './utils.ts'

class RoundPisteLocator extends Locator {
  parentItemType = MaterialType.RoundCard
  coordinates = { z: 1 }

  getParentItem(_location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const parent = this.getParentItem(location, context)
    if(!parent) return { x: 30, y: 3 }
    const parentRotated = this.getParentItem(location, context)?.location.rotation ?? false
    const baseX = parent.location.x ?? 0
    const baseY = parent.location.y ?? 0
    switch (location.id) {
      case 1:
        return parentRotated ? { x: baseX + 2, y: baseY - 3 } : { x: baseX - 2, y: baseY - 3 }
      case 2:
        return parentRotated ? { x: baseX - 2, y: baseY - 3 } : { x: baseX + 2, y: baseY - 3 }
      case 3:
        return parentRotated ? { x: baseX - 2, y: baseY } : { x: baseX + 2, y: baseY }
      case 4:
        return parentRotated ? { x: baseX + 2, y: baseY } : { x: baseX - 2, y: baseY }
      case 5:
        return parentRotated ? { x: baseX + 2, y: baseY + 3 } : { x: baseX - 2, y: baseY + 3 }
      case 6:
      default:
        return parentRotated ? { x: baseX - 2, y: baseY + 3 } : { x: baseX + 2, y: baseY + 3 }
    }
  }

  getRotateZ(_location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): number {
    return isPlayerBlack(getContextPlayer(context)) ? 90 : -90
  }

  locationDescription = new RoundPisteDescription()
}

class RoundPisteDescription extends DropAreaDescription {
  width = 1.5
  height = 1.5
}

export const roundPisteLocator = new RoundPisteLocator()
