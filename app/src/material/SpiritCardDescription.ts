import { SpiritCard, SpiritType } from '@gamepark/bloody-grove/material/SpiritCard.ts'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { CardDescription } from '@gamepark/react-game'
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

  images = {
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
    [SpiritCard.OwlElite10]: owlElite10
  }

  backImages = {
    [PlayerColor.Black * 100 + SpiritType.Base]: baseSpiritBackBlack,
    [PlayerColor.Green * 100 + SpiritType.Base]: baseSpiritBackGreen,
    [SpiritType.Bear]: bearEliteBack,
    [SpiritType.Fox]: foxEliteBack,
    [SpiritType.Owl]: owlEliteBack,
  }
}

export const spiritCardDescription = new SpiritCardDescription()
