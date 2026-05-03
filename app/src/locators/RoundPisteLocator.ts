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

  getPositionOnParent(location: Location, context: MaterialContext) {
    const parent = this.getParentItem(location, context)
    const viewer = context.player ?? context.rules.players[0]
    const firstPlayer = parent?.location.rotation ? PlayerColor.Green : PlayerColor.Black
    const positions = [
      { x: 18, y: 18 },
      { x: 82, y: 18 },
      { x: 82, y: 50 },
      { x: 18, y: 50 },
      { x: 18, y: 82 },
      { x: 82, y: 82 }
    ]
    const pos = positions[(location.id ?? 6) - 1]
    return viewer === firstPlayer ? pos : { x: 100 - pos.x, y: pos.y }
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
