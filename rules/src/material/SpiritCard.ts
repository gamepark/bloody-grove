import { MaterialItem } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'

export enum SpiritCard {
  DruidBlack = 1,
  DruidGreen,
  BearBase1,
  BearBase2,
  BearBase3,
  BearElite1,
  BearElite2,
  BearElite3,
  BearElite4,
  BearElite5,
  BearElite6,
  BearElite7,
  BearElite8,
  BearElite9,
  BearElite10,
  FoxBase1,
  FoxBase2,
  FoxBase3,
  FoxElite1,
  FoxElite2,
  FoxElite3,
  FoxElite4,
  FoxElite5,
  FoxElite6,
  FoxElite7,
  FoxElite8,
  FoxElite9,
  FoxElite10,
  OwlBase1,
  OwlBase2,
  OwlBase3,
  OwlElite1,
  OwlElite2,
  OwlElite3,
  OwlElite4,
  OwlElite5,
  OwlElite6,
  OwlElite7,
  OwlElite8,
  OwlElite9,
  OwlElite10,
  ElderSpirit1,
  ElderSpirit2,
  ElderSpirit3,
  ElderSpirit4,
  ElderSpirit5,
  ElderSpirit6,
  ElderSpirit7,
  ElderSpirit8,
  ElderSpirit9,
  ElderSpiritRed1,
  ElderSpiritRed2,
  ElderSpiritRed3
}

export enum SpiritType {
  Base = 1,
  Bear,
  Fox,
  Owl,
  Elder,
  ElderRed
}

export type SpiritCardId = {
  front?: SpiritCard
  back: SpiritType
}

export const baseSpiritCards = [
  SpiritCard.BearBase1,
  SpiritCard.BearBase2,
  SpiritCard.BearBase3,
  SpiritCard.FoxBase1,
  SpiritCard.FoxBase2,
  SpiritCard.FoxBase3,
  SpiritCard.OwlBase1,
  SpiritCard.OwlBase2,
  SpiritCard.OwlBase3
]

export const foxEliteCards = [
  SpiritCard.FoxElite1,
  SpiritCard.FoxElite2,
  SpiritCard.FoxElite3,
  SpiritCard.FoxElite4,
  SpiritCard.FoxElite5,
  SpiritCard.FoxElite6,
  SpiritCard.FoxElite7,
  SpiritCard.FoxElite8,
  SpiritCard.FoxElite9,
  SpiritCard.FoxElite10
]

export const bearEliteCards = [
  SpiritCard.BearElite1,
  SpiritCard.BearElite2,
  SpiritCard.BearElite3,
  SpiritCard.BearElite4,
  SpiritCard.BearElite5,
  SpiritCard.BearElite6,
  SpiritCard.BearElite7,
  SpiritCard.BearElite8,
  SpiritCard.BearElite9,
  SpiritCard.BearElite10
]

export const owlEliteCards = [
  SpiritCard.OwlElite1,
  SpiritCard.OwlElite2,
  SpiritCard.OwlElite3,
  SpiritCard.OwlElite4,
  SpiritCard.OwlElite5,
  SpiritCard.OwlElite6,
  SpiritCard.OwlElite7,
  SpiritCard.OwlElite8,
  SpiritCard.OwlElite9,
  SpiritCard.OwlElite10
]

export const elderSpiritCards = [
  SpiritCard.ElderSpirit1,
  SpiritCard.ElderSpirit2,
  SpiritCard.ElderSpirit3,
  SpiritCard.ElderSpirit4,
  SpiritCard.ElderSpirit5,
  SpiritCard.ElderSpirit6,
  SpiritCard.ElderSpirit7,
  SpiritCard.ElderSpirit8,
  SpiritCard.ElderSpirit9
]

export const elderSpiritRedCards = [SpiritCard.ElderSpiritRed1, SpiritCard.ElderSpiritRed2, SpiritCard.ElderSpiritRed3]

export interface SpiritCardData {
  type: string
  force: (otherPlayerCardsInGrove: MaterialItem[]) => number
  leftIncantations: string[]
  rightIncantations: string[]
  ruses: number
  arcanes: number
  dominations: (otherPlayerCardsInGrove: MaterialItem[]) => number
  effects?: RuleId[]
}

const incantations = (bear = 0, owl = 0, fox = 0): string[] => [
  ...Array.from({ length: bear }, () => 'bear'),
  ...Array.from({ length: owl }, () => 'owl'),
  ...Array.from({ length: fox }, () => 'fox')
]

export const spiritCardData: Record<SpiritCard, SpiritCardData> = {
  [SpiritCard.DruidBlack]: {
    type: 'druid',
    force: () => 0,
    leftIncantations: incantations(1, 1, 1),
    rightIncantations: incantations(1, 1, 1),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.DruidGreen]: {
    type: 'druid',
    force: () => 0,
    leftIncantations: incantations(1, 1, 1),
    rightIncantations: incantations(1, 1, 1),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearBase1]: { type: 'bear', force: () => 3, leftIncantations: incantations(1, 0, 0), rightIncantations: incantations(1, 0, 0), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.BearBase2]: { type: 'bear', force: () => 1, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(1, 1, 0), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.BearBase3]: { type: 'bear', force: () => 1, leftIncantations: incantations(1, 1, 0), rightIncantations: incantations(1, 0, 1), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.BearElite1]: { type: 'bear', force: () => 3, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 1, dominations: () => 0 },
  [SpiritCard.BearElite2]: {
    type: 'bear',
    force: () => 3,
    leftIncantations: incantations(1, 1, 0),
    rightIncantations: incantations(1, 1, 0),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearElite3]: {
    type: 'bear',
    force: () => 3,
    leftIncantations: incantations(1, 1, 0),
    rightIncantations: incantations(1, 1, 0),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearElite4]: {
    type: 'bear',
    force: () => 3,
    leftIncantations: incantations(1, 0, 1),
    rightIncantations: incantations(1, 0, 1),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearElite5]: { type: 'bear', force: () => 4, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.BearElite6]: { type: 'bear', force: () => 3, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 1, arcanes: 0, dominations: () => 0 },
  [SpiritCard.BearElite7]: {
    type: 'bear',
    force: () => 0,
    leftIncantations: incantations(1, 1, 1),
    rightIncantations: incantations(1, 1, 1),
    ruses: 0,
    arcanes: 0,
    dominations: () => 1
  },
  [SpiritCard.BearElite8]: {
    type: 'bear',
    force: () => 3,
    leftIncantations: incantations(1, 1, 0),
    rightIncantations: incantations(1, 1, 0),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearElite9]: {
    type: 'bear',
    force: () => 4,
    leftIncantations: incantations(1, 0, 0),
    rightIncantations: incantations(1, 0, 0),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.BearElite10]: {
    type: 'bear',
    force: () => 3,
    leftIncantations: incantations(1, 0, 1),
    rightIncantations: incantations(1, 0, 1),
    ruses: 0,
    arcanes: 0,
    dominations: () => 0
  },
  [SpiritCard.FoxBase1]: { type: 'fox', force: () => 1, leftIncantations: incantations(0, 1, 1), rightIncantations: incantations(1, 0, 1), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxBase2]: { type: 'fox', force: () => 1, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(0, 1, 1), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxBase3]: { type: 'fox', force: () => 1, leftIncantations: incantations(0, 0, 1), rightIncantations: incantations(0, 0, 1), ruses: 1, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite1]: { type: 'fox', force: () => 0, leftIncantations: incantations(0, 1, 1), rightIncantations: incantations(0, 1, 1), ruses: 1, arcanes: 1, dominations: () => 0 },
  [SpiritCard.FoxElite2]: { type: 'fox', force: () => 0, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(1, 0, 1), ruses: 1, arcanes: 1, dominations: () => 0 },
  [SpiritCard.FoxElite3]: { type: 'fox', force: () => 1, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(0, 1, 1), ruses: 1, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite4]: { type: 'fox', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 2, arcanes: 2, dominations: () => 0 },
  [SpiritCard.FoxElite5]: { type: 'fox', force: () => 0, leftIncantations: incantations(1, 1, 1), rightIncantations: incantations(1, 1, 1), ruses: 0, arcanes: 0, dominations: () => 1 },
  [SpiritCard.FoxElite6]: { type: 'fox', force: () => 1, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(1, 0, 1), ruses: 1, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite7]: { type: 'fox', force: () => 1, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 3, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite8]: { type: 'fox', force: () => 1, leftIncantations: incantations(0, 0, 1), rightIncantations: incantations(0, 0, 1), ruses: 2, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite9]: { type: 'fox', force: () => 3, leftIncantations: incantations(1, 0, 1), rightIncantations: incantations(1, 0, 1), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.FoxElite10]: { type: 'fox', force: () => 2, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 2, arcanes: 0, dominations: () => 0 },
  [SpiritCard.OwlBase1]: { type: 'owl', force: () => 1, leftIncantations: incantations(0, 1, 0), rightIncantations: incantations(0, 1, 0), ruses: 0, arcanes: 1, dominations: () => 0 },
  [SpiritCard.OwlBase2]: { type: 'owl', force: () => 1, leftIncantations: incantations(0, 1, 1), rightIncantations: incantations(1, 1, 0), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.OwlBase3]: { type: 'owl', force: () => 1, leftIncantations: incantations(1, 1, 0), rightIncantations: incantations(0, 1, 1), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.OwlElite1]: { type: 'owl', force: () => 1, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 3, dominations: () => 0 },
  [SpiritCard.OwlElite2]: { type: 'owl', force: () => 0, leftIncantations: incantations(1, 1, 1), rightIncantations: incantations(1, 1, 1), ruses: 0, arcanes: 0, dominations: () => 1 },
  [SpiritCard.OwlElite3]: { type: 'owl', force: () => 2, leftIncantations: incantations(0, 1, 0), rightIncantations: incantations(0, 1, 0), ruses: 0, arcanes: 1, dominations: () => 0 },
  [SpiritCard.OwlElite4]: { type: 'owl', force: () => 1, leftIncantations: incantations(1, 1, 0), rightIncantations: incantations(1, 1, 0), ruses: 0, arcanes: 1, dominations: () => 0 },
  [SpiritCard.OwlElite5]: { type: 'owl', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 1, arcanes: 2, dominations: () => 0 },
  [SpiritCard.OwlElite6]: { type: 'owl', force: () => 0, leftIncantations: incantations(0, 1, 1), rightIncantations: incantations(0, 1, 1), ruses: 1, arcanes: 1, dominations: () => 0 },
  [SpiritCard.OwlElite7]: { type: 'owl', force: () => 3, leftIncantations: incantations(1, 1, 0), rightIncantations: incantations(1, 1, 0), ruses: 0, arcanes: 0, dominations: () => 0 },
  [SpiritCard.OwlElite8]: { type: 'owl', force: () => 1, leftIncantations: incantations(0, 1, 0), rightIncantations: incantations(0, 1, 0), ruses: 0, arcanes: 2, dominations: () => 0 },
  [SpiritCard.OwlElite9]: { type: 'owl', force: () => 0, leftIncantations: incantations(0, 1, 1), rightIncantations: incantations(1, 1, 0), ruses: 1, arcanes: 1, dominations: () => 0 },
  [SpiritCard.OwlElite10]: { type: 'owl', force: () => 2, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 2, dominations: () => 0 },
  [SpiritCard.ElderSpirit1]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 2, effects: [RuleId.ElderEffectPlaceCardUnderDeckInGrove] },
  [SpiritCard.ElderSpirit2]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1, effects: [RuleId.ElderEffectShowArcane, RuleId.ElderEffectTakeSpirit] },
  [SpiritCard.ElderSpirit3]: { type: 'elder', force: calculateByElderCardsInGrove, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1 },
  [SpiritCard.ElderSpirit4]: { type: 'elder', force: () => 1, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1, effects: [RuleId.ElderEffectShowArcane, RuleId.ElderEffectTakeSpirit] },
  [SpiritCard.ElderSpirit5]: { type: 'elder', force: () => 1, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1, effects: [RuleId.ElderEffectShowArcane] },
  [SpiritCard.ElderSpirit6]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1, effects: [RuleId.ElderEffectShowArcane, RuleId.ElderEffectPlaceCardUnderDeckInGrove] },
  [SpiritCard.ElderSpirit7]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 2, effects: [RuleId.ElderEffectTakeSpirit] },
  [SpiritCard.ElderSpirit8]: { type: 'elder', force: () => 1, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1, effects: [RuleId.ElderEffectShowArcane, RuleId.ElderEffectShowArcane] },
  [SpiritCard.ElderSpirit9]: { type: 'elder', force: () => 2, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 1 },
  [SpiritCard.ElderSpiritRed1]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: calculateByUniqueCardsTypeInGrove },
  [SpiritCard.ElderSpiritRed2]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: calculateByElderCardsInGrove },
  [SpiritCard.ElderSpiritRed3]: { type: 'elder', force: () => 0, leftIncantations: incantations(), rightIncantations: incantations(), ruses: 0, arcanes: 0, dominations: () => 2 }
}

function calculateByElderCardsInGrove(otherPlayerCardsInGrove: MaterialItem[]):  number {
  let result = 0
  otherPlayerCardsInGrove.forEach(card => {
    if(spiritCardData[card.id.front as SpiritCard].type === 'elder') {
      result++
    }
  })
  return result
}

function calculateByUniqueCardsTypeInGrove(otherPlayerCardsInGrove: MaterialItem[]):  number {
  const types = otherPlayerCardsInGrove.map(card => card.id.front as SpiritCard).map(card => spiritCardData[card].type)
  return new Set(types.filter(t => t !== 'elder')).size
}