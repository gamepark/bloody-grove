import { faArrowDown, faArrowUp, faHand } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType.ts'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { SpiritCard, SpiritType } from '@gamepark/bloody-grove/material/SpiritCard.ts'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { SpiritCardHelp } from './help/SpiritCardHelp'
import druidBlack from '../images/cards/druids/DruidBlack.jpg'
import druidGreen from '../images/cards/druids/DruidGreen.jpg'
import baseSpiritBackBlack from '../images/cards/druids/BaseSpiritBackBlack.jpg'
import baseSpiritBackGreen from '../images/cards/druids/BaseSpiritBackGreen.jpg'
import bearBase1 from '../images/cards/spirits/base/BearBase1.jpg'
import bearBase2 from '../images/cards/spirits/base/BearBase2.jpg'
import bearBase3 from '../images/cards/spirits/base/BearBase3.jpg'
import foxBase1 from '../images/cards/spirits/base/FoxBase1.jpg'
import foxBase2 from '../images/cards/spirits/base/FoxBase2.jpg'
import foxBase3 from '../images/cards/spirits/base/FoxBase3.jpg'
import owlBase1 from '../images/cards/spirits/base/OwlBase1.jpg'
import owlBase2 from '../images/cards/spirits/base/OwlBase2.jpg'
import owlBase3 from '../images/cards/spirits/base/OwlBase3.jpg'
import elderSpirit1 from '../images/cards/spirits/elder/ElderSpirit1.jpg'
import elderSpirit2 from '../images/cards/spirits/elder/ElderSpirit2.jpg'
import elderSpirit3 from '../images/cards/spirits/elder/ElderSpirit3.jpg'
import elderSpirit4 from '../images/cards/spirits/elder/ElderSpirit4.jpg'
import elderSpirit5 from '../images/cards/spirits/elder/ElderSpirit5.jpg'
import elderSpirit6 from '../images/cards/spirits/elder/ElderSpirit6.jpg'
import elderSpirit7 from '../images/cards/spirits/elder/ElderSpirit7.jpg'
import elderSpirit8 from '../images/cards/spirits/elder/ElderSpirit8.jpg'
import elderSpirit9 from '../images/cards/spirits/elder/ElderSpirit9.jpg'
import elderSpiritBack from '../images/cards/spirits/elder/ElderSpiritBack.jpg'
import elderSpiritBackRed from '../images/cards/spirits/elder/ElderSpiritBackRed.jpg'
import elderSpiritRed1 from '../images/cards/spirits/elder/ElderSpiritRed1.jpg'
import elderSpiritRed2 from '../images/cards/spirits/elder/ElderSpiritRed2.jpg'
import elderSpiritRed3 from '../images/cards/spirits/elder/ElderSpiritRed3.jpg'
import bearElite1 from '../images/cards/spirits/elite/bear/BearElite1.jpg'
import bearElite2 from '../images/cards/spirits/elite/bear/BearElite2.jpg'
import bearElite3 from '../images/cards/spirits/elite/bear/BearElite3.jpg'
import bearElite4 from '../images/cards/spirits/elite/bear/BearElite4.jpg'
import bearElite5 from '../images/cards/spirits/elite/bear/BearElite5.jpg'
import bearElite6 from '../images/cards/spirits/elite/bear/BearElite6.jpg'
import bearElite7 from '../images/cards/spirits/elite/bear/BearElite7.jpg'
import bearElite8 from '../images/cards/spirits/elite/bear/BearElite8.jpg'
import bearElite9 from '../images/cards/spirits/elite/bear/BearElite9.jpg'
import bearElite10 from '../images/cards/spirits/elite/bear/BearElite10.jpg'
import bearEliteBack from '../images/cards/spirits/elite/bear/BearEliteBack.jpg'
import foxElite1 from '../images/cards/spirits/elite/fox/FoxElite1.jpg'
import foxElite2 from '../images/cards/spirits/elite/fox/FoxElite2.jpg'
import foxElite3 from '../images/cards/spirits/elite/fox/FoxElite3.jpg'
import foxElite4 from '../images/cards/spirits/elite/fox/FoxElite4.jpg'
import foxElite5 from '../images/cards/spirits/elite/fox/FoxElite5.jpg'
import foxElite6 from '../images/cards/spirits/elite/fox/FoxElite6.jpg'
import foxElite7 from '../images/cards/spirits/elite/fox/FoxElite7.jpg'
import foxElite8 from '../images/cards/spirits/elite/fox/FoxElite8.jpg'
import foxElite9 from '../images/cards/spirits/elite/fox/FoxElite9.jpg'
import foxElite10 from '../images/cards/spirits/elite/fox/FoxElite10.jpg'
import foxEliteBack from '../images/cards/spirits/elite/fox/FoxEliteBack.jpg'
import owlElite1 from '../images/cards/spirits/elite/owl/OwlElite1.jpg'
import owlElite2 from '../images/cards/spirits/elite/owl/OwlElite2.jpg'
import owlElite3 from '../images/cards/spirits/elite/owl/OwlElite3.jpg'
import owlElite4 from '../images/cards/spirits/elite/owl/OwlElite4.jpg'
import owlElite5 from '../images/cards/spirits/elite/owl/OwlElite5.jpg'
import owlElite6 from '../images/cards/spirits/elite/owl/OwlElite6.jpg'
import owlElite7 from '../images/cards/spirits/elite/owl/OwlElite7.jpg'
import owlElite8 from '../images/cards/spirits/elite/owl/OwlElite8.jpg'
import owlElite9 from '../images/cards/spirits/elite/owl/OwlElite9.jpg'
import owlElite10 from '../images/cards/spirits/elite/owl/OwlElite10.jpg'
import owlEliteBack from '../images/cards/spirits/elite/owl/OwnEliteBack.jpg'

export class SpiritCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  menuAlwaysVisible = true

  help = SpiritCardHelp

  images = {
    [SpiritCard.DruidBlack]: druidBlack,
    [SpiritCard.DruidGreen]: druidGreen,
    [SpiritCard.BearBase1]: bearBase1,
    [SpiritCard.BearBase2]: bearBase2,
    [SpiritCard.BearBase3]: bearBase3,
    [SpiritCard.BearElite1]: bearElite1,
    [SpiritCard.BearElite2]: bearElite2,
    [SpiritCard.BearElite3]: bearElite3,
    [SpiritCard.BearElite4]: bearElite4,
    [SpiritCard.BearElite5]: bearElite5,
    [SpiritCard.BearElite6]: bearElite6,
    [SpiritCard.BearElite7]: bearElite7,
    [SpiritCard.BearElite8]: bearElite8,
    [SpiritCard.BearElite9]: bearElite9,
    [SpiritCard.BearElite10]: bearElite10,
    [SpiritCard.FoxBase1]: foxBase1,
    [SpiritCard.FoxBase2]: foxBase2,
    [SpiritCard.FoxBase3]: foxBase3,
    [SpiritCard.FoxElite1]: foxElite1,
    [SpiritCard.FoxElite2]: foxElite2,
    [SpiritCard.FoxElite3]: foxElite3,
    [SpiritCard.FoxElite4]: foxElite4,
    [SpiritCard.FoxElite5]: foxElite5,
    [SpiritCard.FoxElite6]: foxElite6,
    [SpiritCard.FoxElite7]: foxElite7,
    [SpiritCard.FoxElite8]: foxElite8,
    [SpiritCard.FoxElite9]: foxElite9,
    [SpiritCard.FoxElite10]: foxElite10,
    [SpiritCard.OwlBase1]: owlBase1,
    [SpiritCard.OwlBase2]: owlBase2,
    [SpiritCard.OwlBase3]: owlBase3,
    [SpiritCard.OwlElite1]: owlElite1,
    [SpiritCard.OwlElite2]: owlElite2,
    [SpiritCard.OwlElite3]: owlElite3,
    [SpiritCard.OwlElite4]: owlElite4,
    [SpiritCard.OwlElite5]: owlElite5,
    [SpiritCard.OwlElite6]: owlElite6,
    [SpiritCard.OwlElite7]: owlElite7,
    [SpiritCard.OwlElite8]: owlElite8,
    [SpiritCard.OwlElite9]: owlElite9,
    [SpiritCard.OwlElite10]: owlElite10,
    [SpiritCard.ElderSpirit1]: elderSpirit1,
    [SpiritCard.ElderSpirit2]: elderSpirit2,
    [SpiritCard.ElderSpirit3]: elderSpirit3,
    [SpiritCard.ElderSpirit4]: elderSpirit4,
    [SpiritCard.ElderSpirit5]: elderSpirit5,
    [SpiritCard.ElderSpirit6]: elderSpirit6,
    [SpiritCard.ElderSpirit7]: elderSpirit7,
    [SpiritCard.ElderSpirit8]: elderSpirit8,
    [SpiritCard.ElderSpirit9]: elderSpirit9,
    [SpiritCard.ElderSpiritRed1]: elderSpiritRed1,
    [SpiritCard.ElderSpiritRed2]: elderSpiritRed2,
    [SpiritCard.ElderSpiritRed3]: elderSpiritRed3,
  }

  backImages = {
    [PlayerColor.Black * 100 + SpiritType.Base]: baseSpiritBackBlack,
    [PlayerColor.Green * 100 + SpiritType.Base]: baseSpiritBackGreen,
    [SpiritType.Bear]: bearEliteBack,
    [SpiritType.Fox]: foxEliteBack,
    [SpiritType.Owl]: owlEliteBack,
    [SpiritType.Elder]: elderSpiritBack,
    [SpiritType.ElderRed]: elderSpiritBackRed,
  }

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const takeOnTopDeck = legalMoves.find(
      (move) => isMoveItemType(MaterialType.SpiritCard)(move)
        && move.location.type === LocationType.PlayerDeck
        && move.location.player === context.player
        && move.location.x === undefined
        && move.itemIndex === context.index
    )
    const takeOnBottomDeck = legalMoves.find(
      (move) => isMoveItemType(MaterialType.SpiritCard)(move)
        && move.location.type === LocationType.PlayerDeck
        && move.location.player === context.player
        && move.location.x === 0
        && move.itemIndex === context.index
    )
    const takeOnHand = legalMoves.find(
      (move) => isMoveItemType(MaterialType.SpiritCard)(move)
        && move.location.type === LocationType.PlayerHand
        && move.location.player === context.player
        && move.itemIndex === context.index
    )

    if (takeOnTopDeck || takeOnBottomDeck || takeOnHand) {
      return (
        <>
          {takeOnTopDeck && (
          <ItemMenuButton angle={50} radius={4} x={-2} y={0} move={takeOnTopDeck}>
            <FontAwesomeIcon icon={faArrowUp} css={pointerCursorCss} />
      </ItemMenuButton>
    )}
          {takeOnBottomDeck && (
          <ItemMenuButton angle={50} radius={4} x={0} y={0} move={takeOnBottomDeck}>
            <FontAwesomeIcon icon={faArrowDown} css={pointerCursorCss} />
      </ItemMenuButton>
    )}
          {takeOnHand && (
          <ItemMenuButton angle={50} radius={4} x={2} y={0} move={takeOnHand}>
            <FontAwesomeIcon icon={faHand} css={pointerCursorCss} />
      </ItemMenuButton>
    )}
      </>
    )
    }
    return undefined
  }
}

export const spiritCardDescription = new SpiritCardDescription()
