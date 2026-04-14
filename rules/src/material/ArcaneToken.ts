import { getEnumValues } from '@gamepark/rules-api'

export enum ArcaneToken {
  ArcaneToken2 = 1,
  ArcaneToken3,
  ArcaneToken4,
  ArcaneTokenDiscard
}

export const arcaneTokens = [...getEnumValues(ArcaneToken), ...getEnumValues(ArcaneToken), ...getEnumValues(ArcaneToken)]

export const getArcaneTokenValue = (token: ArcaneToken): number => {
  switch (token) {
    case ArcaneToken.ArcaneToken2:
      return 2
    case ArcaneToken.ArcaneToken3:
      return 3
    case ArcaneToken.ArcaneToken4:
      return 4
    case ArcaneToken.ArcaneTokenDiscard:
      return 0
    default:
      return 0
  }
}
