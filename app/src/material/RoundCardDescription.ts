import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import roundCard1 from '../images/cards/RoundCard1.jpg'
import roundCard2 from '../images/cards/RoundCard2.jpg'

export class RoundCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  isFlipped(item: Partial<MaterialItem<number, number>>): boolean {
    return item.location?.rotation
  }

  image = roundCard1
  backImage = roundCard2
}

export const roundCardDescription = new RoundCardDescription()
