import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  radius = 80
  maxAngle = 40

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: -20,
      y: index === 0 ? 15 : -15,
      z: 0,
    }
  }
  getHoverTransform(item: MaterialItem<number, number>, context: ItemContext<number, number, number>,): string[] {
    return [...super.getHoverTransform(item, context), 'translateY(-2.5em)']
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
