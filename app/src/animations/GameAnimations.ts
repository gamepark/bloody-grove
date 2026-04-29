import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { underDeckWaypointLocator } from '../locators/UnderDeckWaypointLocator'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure(
    (move) =>
      isMoveItemType(MaterialType.SpiritCard)(move) &&
      move.location.type === LocationType.PlayerDeck &&
      move.location.x === 0
  )
  .via({
    at: 0.7,
    locator: underDeckWaypointLocator,
    location: (item) => ({ type: LocationType.PlayerDeck, player: item.location.player, x: 0 }),
    elevation: 0
  })
