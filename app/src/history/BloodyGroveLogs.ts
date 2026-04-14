import { RuleId } from '@gamepark/bloody-grove/rules/RuleId.ts'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { ElderEffectPlaceCardInGroveHistory } from './components/ElderEffectPlaceCardInGroveHistory.tsx'
import { MoveSpiritHistory } from './components/MoveSpiritHistory.tsx'
import { PlaceArcaneHistory } from './components/PlaceArcaneHistory.tsx'
import { PlaceSpiritCardNearDruidHistory } from './components/PlaceSpiritCardNearDruidHistory.tsx'
import { PlaceSpiritCardUnderGroveHistory } from './components/PlaceSpiritCardUnderGroveHistory.tsx'
import { TakeElderSpiritHistory } from './components/TakeElderSpiritHistory.tsx'
import { TakeSpiritAndPlaceOnHandHistory } from './components/TakeSpiritAndPlaceOnHandHistory.tsx'
import { TakeSpiritAndPlaceTopOfDeckHistory } from './components/TakeSpiritAndPlaceTopOfDeckHistory.tsx'
import { TakeSpiritAndPlaceUnderDeckHistory } from './components/TakeSpiritAndPlaceUnderDeckHistory.tsx'

export class BloodyGroveLogs implements LogDescription<MaterialMove> {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const { game, action } = context
    const ruleId = game.rule?.id

    if (ruleId === RuleId.ChooseAction && isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
        return { Component: PlaceSpiritCardUnderGroveHistory, player: action.playerId }
      }
      if (move.location.type === LocationType.PlayerSpiritNearDruidLayout) {
        return { Component: PlaceSpiritCardNearDruidHistory, player: action.playerId }
      }
    }

    if (ruleId === RuleId.PlaceArcane && isMoveItemType(MaterialType.ArcaneToken)(move)) {
      if (move.location.type === LocationType.ArcaneOnSpiritCardLayout) {
        return { Component: PlaceArcaneHistory, player: action.playerId, depth: 1 }
      }
    }

    if (ruleId === RuleId.MoveSpirit && isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
        return { Component: MoveSpiritHistory, player: action.playerId, depth: 1 }
      }
    }

    if (ruleId === RuleId.TakeSpiritCards && isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerDeck && move.location.x === 0) {
        return { Component: TakeSpiritAndPlaceUnderDeckHistory, player: action.playerId, depth: 1 }
      }
      if (move.location.type === LocationType.PlayerDeck) {
        return { Component: TakeSpiritAndPlaceTopOfDeckHistory, player: action.playerId, depth: 1 }
      }
      if (move.location.type === LocationType.PlayerHand) {
        return { Component: TakeSpiritAndPlaceOnHandHistory, player: action.playerId, depth: 1 }
      }
    }

    if (
      (ruleId === RuleId.EndOfRoundTakeElderSpirit0 || ruleId === RuleId.EndOfRoundTakeElderSpirit1 || ruleId === RuleId.EndOfRoundTakeElderSpirit2) &&
      isMoveItemType(MaterialType.SpiritCard)(move)
    ) {
      if (move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
        return { Component: TakeElderSpiritHistory, player: action.playerId }
      }
    }

    if (ruleId === RuleId.ElderEffectTakeSpirit && isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerDeck && move.location.x === 0) {
        return { Component: TakeSpiritAndPlaceUnderDeckHistory, player: action.playerId, depth: 1 }
      }
      if (move.location.type === LocationType.PlayerDeck) {
        return { Component: TakeSpiritAndPlaceTopOfDeckHistory, player: action.playerId, depth: 1 }
      }
    }

    if (ruleId === RuleId.ElderEffectPlaceCardUnderDeckInGrove && isMoveItemType(MaterialType.SpiritCard)(move)) {
      if (move.location.type === LocationType.PlayerSpiritUnderGroveLayout) {
        return { Component: ElderEffectPlaceCardInGroveHistory, player: action.playerId, depth: 1 }
      }
    }

    return undefined
  }
}
