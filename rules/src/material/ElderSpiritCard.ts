export enum ElderSpiritCard {
  ElderSpirit1 = 1,
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
  ElderSpiritRed3,
}

export enum ElderSpiritType {
  ElderSpirit = 1,
  ElderSpiritRed,
}

export type ElderSpiritCardId = {
  front?: ElderSpiritCard
  back: ElderSpiritType
}

export const elderSpiritCards = [
  ElderSpiritCard.ElderSpirit1,
  ElderSpiritCard.ElderSpirit2,
  ElderSpiritCard.ElderSpirit3,
  ElderSpiritCard.ElderSpirit4,
  ElderSpiritCard.ElderSpirit5,
  ElderSpiritCard.ElderSpirit6,
  ElderSpiritCard.ElderSpirit7,
  ElderSpiritCard.ElderSpirit8,
  ElderSpiritCard.ElderSpirit9,
]

export const elderSpiritRedCards = [
  ElderSpiritCard.ElderSpiritRed1,
  ElderSpiritCard.ElderSpiritRed2,
  ElderSpiritCard.ElderSpiritRed3
]
