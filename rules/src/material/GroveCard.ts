import { getEnumValues } from '@gamepark/rules-api'

export enum GroveCard {
  GroveBear = 1,
  GroveFox,
  GroveOwl
}

export const groveCards = getEnumValues(GroveCard)


export const getGroveType = (groveCard: GroveCard): string => {
  switch (groveCard) {
    case GroveCard.GroveBear:
      return 'bear'
    case GroveCard.GroveFox:
      return 'fox'
    case GroveCard.GroveOwl:
    default:
      return 'owl'
  }
}