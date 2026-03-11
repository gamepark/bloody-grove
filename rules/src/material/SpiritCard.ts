export enum SpiritCard {
  BearBase1 = 1,
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
  OwlElite10
}

export enum SpiritType {
  Base = 1,
  Bear,
  Fox,
  Owl
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