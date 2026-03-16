import { ArcaneToken } from '@gamepark/bloody-grove/material/ArcaneToken.ts'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType.ts'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import arcaneToken2 from '../images/tokens/ArcaneToken2.jpg'
import arcaneToken3 from '../images/tokens/ArcaneToken3.jpg'
import arcaneToken4 from '../images/tokens/ArcaneToken4.jpg'
import arcaneTokenBack from '../images/tokens/ArcaneTokenBack.jpg'
import arcaneTokenDiscard from '../images/tokens/ArcaneTokenDiscard.jpg'
import { ArcaneTokenHelp } from './help/ArcaneTokenHelp'

export class ArcaneTokenDescription extends TokenDescription {
  width = 1.5

  images = {
    [ArcaneToken.ArcaneToken2]: arcaneToken2,
    [ArcaneToken.ArcaneToken3]: arcaneToken3,
    [ArcaneToken.ArcaneToken4]: arcaneToken4,
    [ArcaneToken.ArcaneTokenDiscard]: arcaneTokenDiscard
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.ArcaneToken)(move) && move.itemIndex === context.index && move.location.player === context.player && move.location.type === LocationType.ArcaneShowLayout
     || isMoveItemType(MaterialType.ArcaneToken)(move) && move.itemIndex === context.index && move.location.type === LocationType.ArcaneReserve
  }

  backImage = arcaneTokenBack

  help = ArcaneTokenHelp
}

export const arcaneTokenDescription = new ArcaneTokenDescription()
