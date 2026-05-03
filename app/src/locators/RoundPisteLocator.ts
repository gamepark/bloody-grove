import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'

class RoundPisteLocator extends Locator {
  parentItemType = MaterialType.RoundCard
  coordinates = { z: 1 }
  rotateZ = 90

  getParentItem(_location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).getItem()
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const parent = this.getParentItem(location, context)
    if (!parent) return { x: 30, y: 3 }
    const baseX = parent.location.x ?? 0
    const baseY = parent.location.y ?? 0
    const viewer = context.player ?? context.rules.players[0]
    const firstPlayer = parent.location.rotation ? PlayerColor.Green : PlayerColor.Black
    const useBackLayout = viewer !== firstPlayer
    switch (location.id) {
      case 1:
        return useBackLayout ? { x: baseX + 2, y: baseY - 3 } : { x: baseX - 2, y: baseY - 3 }
      case 2:
        return useBackLayout ? { x: baseX - 2, y: baseY - 3 } : { x: baseX + 2, y: baseY - 3 }
      case 3:
        return useBackLayout ? { x: baseX - 2, y: baseY } : { x: baseX + 2, y: baseY }
      case 4:
        return useBackLayout ? { x: baseX + 2, y: baseY } : { x: baseX - 2, y: baseY }
      case 5:
        return useBackLayout ? { x: baseX + 2, y: baseY + 3 } : { x: baseX - 2, y: baseY + 3 }
      case 6:
      default:
        return useBackLayout ? { x: baseX - 2, y: baseY + 3 } : { x: baseX + 2, y: baseY + 3 }
    }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return { rotation: this.getParentItem(_location, context)?.location.rotation }
  }

  locationDescription = new RoundPisteDescription()
}

class RoundPisteDescription extends DropAreaDescription {
  width = 1.5
  height = 1.5
}

export const roundPisteLocator = new RoundPisteLocator()
