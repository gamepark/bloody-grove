import { getEnumValues } from '@gamepark/rules-api'

export enum GroveCard {
  GroveBear = 1,
  GroveFox,
  GroveOwl
}

export const groveCards = getEnumValues(GroveCard)
