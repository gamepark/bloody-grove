/** @jsxImportSource @emotion/react */
import { GroveHelper } from '@gamepark/bloody-grove/rules/helper/GroveHelper.ts'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId.ts'
import { ListLocator, DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { getContextPlayer, isPlayerBlack } from './utils.ts'

class PlayerSpiritUnderGroveLayoutLocator extends ListLocator {
  maxCount = 5

  getGap(location: Location<number, number>, context: MaterialContext<number, number, number>): Partial<Coordinates> {
    return { y: isPlayerBlack(getContextPlayer(context)) ? (isPlayerBlack(location.player) ? 2.5 : -2.5) : isPlayerBlack(location.player) ? -2.5 : 2.5 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const xFromGrove = [-5, 5, 15]
    return {
      x: xFromGrove[location.id ?? 0],
      y: isPlayerBlack(getContextPlayer(context)) ? (isPlayerBlack(location.player) ? 8 : -8) : isPlayerBlack(location.player) ? -8 : 8,
      z: 0
    }
  }
  getRotateZ(location: Location<number, number>, context: MaterialContext<number, number, number>): number {
    return isPlayerBlack(getContextPlayer(context)) ? (isPlayerBlack(location.player) ? 0 : 180) : isPlayerBlack(location.player) ? 180 : 0
  }

  getLocations(context: MaterialContext): Partial<Location>[] {
    if (context.rules.game.rule?.player !== context.player) return []
    if (context.rules.game.rule?.id !== RuleId.ChooseAction) return []
    return [new GroveHelper(context.rules.game).getPossiblePlace()]
  }

  locationDescription = new PlayerSpiritUnderGroveLayoutLocatorDescription()
}

export class PlayerSpiritUnderGroveLayoutLocatorDescription extends DropAreaDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1
}

export const playerSpiritUnderGroveLayoutLocator = new PlayerSpiritUnderGroveLayoutLocator()
