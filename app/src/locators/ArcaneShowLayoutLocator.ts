/** @jsxImportSource @emotion/react */
import { DropAreaDescription, getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class ArcaneShowLayoutLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    return {
      x: -22,
      y: index === 0 ? 8 : -8,
      z: 0
    }
  }

  locationDescription = new ArcaneShowLayoutLocatorDescription()
}

export class ArcaneShowLayoutLocatorDescription extends DropAreaDescription {
  width = 2
  height = 2
}

export const arcaneShowLayoutLocator = new ArcaneShowLayoutLocator()
