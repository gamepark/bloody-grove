import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { ComponentType } from 'react'
import { ElderEffectPlaceCardUnderDeckInGroveHeader } from './ElderEffectPlaceCardUnderDeckInGroveHeader.tsx'
import { ElderEffectShowArcaneHeader } from './ElderEffectShowArcaneHeader.tsx'
import { ElderEffectTakeSpiritHeader } from './ElderEffectTakeSpiritHeader.tsx'
import { EndOfRoundReplaceSpiritHeader } from './EndOfRoundReplaceSpiritHeader.tsx'
import { EndOfRoundResolveGrove0Header } from './resolveGroveRule/EndOfRoundResolveGrove0Header.tsx'
import { EndOfRoundResolveGrove1Header } from './resolveGroveRule/EndOfRoundResolveGrove1Header.tsx'
import { EndOfRoundResolveGrove2Header } from './resolveGroveRule/EndOfRoundResolveGrove2Header.tsx'
import { EndOfRoundRotateArcaneInCards0Header } from './rotateArcaneInCards/EndOfRoundRotateArcaneInCards0Header.tsx'
import { EndOfRoundRotateArcaneInCards1Header } from './rotateArcaneInCards/EndOfRoundRotateArcaneInCards1Header.tsx'
import { EndOfRoundRotateArcaneInCards2Header } from './rotateArcaneInCards/EndOfRoundRotateArcaneInCards2Header.tsx'
import { ShowArcaneSimultaneousHeader } from './ShowArcaneSimultaneousHeader.tsx'
import { ChooseActionHeader } from './ChooseActionHeader.tsx'
import { PlaceArcaneHeader } from './PlaceArcaneHeader.tsx'
import { MoveSpiritHeader } from './MoveSpiritHeader.tsx'
import { PrepareNextRoundHeader } from './PrepareNextRoundHeader.tsx'
import { EndOfRoundTakeElderSpirit0Header } from './takeElderSpiritheader/EndOfRoundTakeElderSpirit0Header.tsx'
import { EndOfRoundTakeElderSpirit1Header } from './takeElderSpiritheader/EndOfRoundTakeElderSpirit1Header.tsx'
import { EndOfRoundTakeElderSpirit2Header } from './takeElderSpiritheader/EndOfRoundTakeElderSpirit2Header.tsx'
import { TakeSpiritCardsHeader } from './TakeSpiritCardsHeader.tsx'
import { EndOfRoundSpiritCardsUnderDeckHeader } from './EndOfRoundSpiritCardsUnderDeckHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ShowArcaneSimultaneous]: ShowArcaneSimultaneousHeader,
  [RuleId.ChooseAction]: ChooseActionHeader,
  [RuleId.PlaceArcane]: PlaceArcaneHeader,
  [RuleId.MoveSpirit]: MoveSpiritHeader,
  [RuleId.PrepareNextRound]: PrepareNextRoundHeader,
  [RuleId.TakeSpiritCards]: TakeSpiritCardsHeader,
  [RuleId.EndOfRoundSpiritCardsUnderDeck]: EndOfRoundSpiritCardsUnderDeckHeader,
  [RuleId.EndOfRoundRotateArcaneInCards0]: EndOfRoundRotateArcaneInCards0Header,
  [RuleId.EndOfRoundRotateArcaneInCards1]: EndOfRoundRotateArcaneInCards1Header,
  [RuleId.EndOfRoundRotateArcaneInCards2]: EndOfRoundRotateArcaneInCards2Header,
  [RuleId.EndOfRoundResolveGrove0]: EndOfRoundResolveGrove0Header,
  [RuleId.EndOfRoundResolveGrove1]: EndOfRoundResolveGrove1Header,
  [RuleId.EndOfRoundResolveGrove2]: EndOfRoundResolveGrove2Header,
  [RuleId.EndOfRoundTakeElderSpirit0]: EndOfRoundTakeElderSpirit0Header,
  [RuleId.EndOfRoundTakeElderSpirit1]: EndOfRoundTakeElderSpirit1Header,
  [RuleId.EndOfRoundTakeElderSpirit2]: EndOfRoundTakeElderSpirit2Header,
  [RuleId.EndOfRoundReplaceSpirit0]: EndOfRoundReplaceSpiritHeader,
  [RuleId.EndOfRoundReplaceSpirit1]: EndOfRoundReplaceSpiritHeader,
  [RuleId.EndOfRoundReplaceSpirit2]: EndOfRoundReplaceSpiritHeader,
  [RuleId.ElderEffectPlaceCardUnderDeckInGrove]: ElderEffectPlaceCardUnderDeckInGroveHeader,
  [RuleId.ElderEffectShowArcane]: ElderEffectShowArcaneHeader,
  [RuleId.ElderEffectTakeSpirit]: ElderEffectTakeSpiritHeader,
}
