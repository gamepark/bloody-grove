import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArcaneToken } from '@gamepark/bloody-grove/material/ArcaneToken.ts'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType.ts'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { ItemContext, ItemMenuButton, pointerCursorCss, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import arcaneToken2 from '../images/tokens/ArcaneToken2.jpg'
import arcaneToken3 from '../images/tokens/ArcaneToken3.jpg'
import arcaneToken4 from '../images/tokens/ArcaneToken4.jpg'
import arcaneTokenBack from '../images/tokens/ArcaneTokenBack.jpg'
import arcaneTokenDiscard from '../images/tokens/ArcaneTokenDiscard.jpg'
import { ArcaneTokenHelp } from './help/ArcaneTokenHelp'

export class ArcaneTokenDescription extends TokenDescription {
  width = 2

  images = {
    [ArcaneToken.ArcaneToken2]: arcaneToken2,
    [ArcaneToken.ArcaneToken3]: arcaneToken3,
    [ArcaneToken.ArcaneToken4]: arcaneToken4,
    [ArcaneToken.ArcaneTokenDiscard]: arcaneTokenDiscard
  }
  backImage = arcaneTokenBack
  help = ArcaneTokenHelp

  menuAlwaysVisible = true

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return (
      (isMoveItemType(MaterialType.ArcaneToken)(move) &&
        move.itemIndex === context.index &&
        move.location.player === context.player &&
        move.location.type === LocationType.ArcaneShowLayout) ||
      (isMoveItemType(MaterialType.ArcaneToken)(move) && move.itemIndex === context.index && move.location.type === LocationType.ArcaneReserve)
    )
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const replace = legalMoves.find(
      (move) => isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneReserve && move.itemIndex === context.index
    )

    if (replace) {
      return (
        <ItemMenuButton angle={20} radius={4} x={1.5} y={-1.5} move={replace} label={'Replacer'} labelPosition="right">
          <FontAwesomeIcon icon={faArrowRight} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

export const arcaneTokenDescription = new ArcaneTokenDescription()
