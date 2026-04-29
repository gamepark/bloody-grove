import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class UnderDeckWaypointLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const baseY = index === 0 ? 13 : -13
    const yOffset = index === 0 ? -8 : 8
    return { x: -40, y: baseY + yOffset, z: 0 }
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transform = super.placeItem(item, context)
    transform.push('rotateY(180deg)')
    return transform
  }
}

export const underDeckWaypointLocator = new UnderDeckWaypointLocator()
