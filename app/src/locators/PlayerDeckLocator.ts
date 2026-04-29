import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { DeckLocator, getRelativePlayerIndex, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerDeckDescription } from './PlayerDeckDescription.ts'

export class PlayerDeckLocator extends DeckLocator {
  locationDescription = new PlayerDeckDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const baseY = index === 0 ? 15 : -15
    const coordinates = { x: -40, y: baseY }

    if (isItemContext(context)) return coordinates

    const count = this.countItems(location, context)
    if (this.isPlacingInDeck(context) && location.player === context.player) {
      if (location.x === 0) {
        return { ...coordinates, y: coordinates.y - 6, z: 0.01 }
      } else {
        return { x: coordinates.x - count * 0.05, y: coordinates.y - 1, z: 5 }
      }
    }

    return coordinates
  }

  getLocations(context: MaterialContext) {
    if (!this.isPlacingInDeck(context) || context.player === undefined) return []
    const ruleId = context.rules.game.rule?.id
    if (ruleId === RuleId.EndOfRoundSpiritCardsUnderDeck) return []
    return [
      { type: LocationType.PlayerDeck, player: context.player, x: 0 },
      { type: LocationType.PlayerDeck, player: context.player }
    ]
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
  }

  private isPlacingInDeck(context: MaterialContext): boolean {
    const ruleId = context.rules.game.rule?.id
    if (
      ruleId !== RuleId.TakeSpiritCards &&
      ruleId !== RuleId.ElderEffectTakeSpirit &&
      ruleId !== RuleId.EndOfRoundSpiritCardsUnderDeck
    ) {
      return false
    }
    return context.player !== undefined && context.rules.isTurnToPlay(context.player)
  }
}

export const playerDeckLocator = new PlayerDeckLocator()
