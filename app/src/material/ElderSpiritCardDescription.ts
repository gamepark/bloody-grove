import { ElderSpiritCard, ElderSpiritType } from '@gamepark/bloody-grove/material/ElderSpiritCard.ts'
import { CardDescription } from '@gamepark/react-game'
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

export class ElderSpiritCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  images = {
    [ElderSpiritCard.ElderSpirit1]: elderSpirit1,
    [ElderSpiritCard.ElderSpirit2]: elderSpirit2,
    [ElderSpiritCard.ElderSpirit3]: elderSpirit3,
    [ElderSpiritCard.ElderSpirit4]: elderSpirit4,
    [ElderSpiritCard.ElderSpirit5]: elderSpirit5,
    [ElderSpiritCard.ElderSpirit6]: elderSpirit6,
    [ElderSpiritCard.ElderSpirit7]: elderSpirit7,
    [ElderSpiritCard.ElderSpirit8]: elderSpirit8,
    [ElderSpiritCard.ElderSpirit9]: elderSpirit9,
    [ElderSpiritCard.ElderSpiritRed1]: elderSpiritRed1,
    [ElderSpiritCard.ElderSpiritRed2]: elderSpiritRed2,
    [ElderSpiritCard.ElderSpiritRed3]: elderSpiritRed3,
  }

  backImages = {
    [ElderSpiritType.ElderSpirit]: elderSpiritBack,
    [ElderSpiritType.ElderSpiritRed]: elderSpiritBackRed,
  }
}

export const elderSpiritCardDescription = new ElderSpiritCardDescription()
