import { getEnumValues } from '@gamepark/rules-api'

export enum ArcaneToken {
  ArcaneToken2 = 1,
  ArcaneToken3,
  ArcaneToken4,
  ArcaneTokenDiscard
}

export const arcaneTokens = [...getEnumValues(ArcaneToken), ...getEnumValues(ArcaneToken), ...getEnumValues(ArcaneToken)]
