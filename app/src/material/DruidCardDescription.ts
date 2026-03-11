import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { CardDescription } from '@gamepark/react-game'
import druidBlack from '../images/cards/druids/DruidBlack.jpg'
import druidGreen from '../images/cards/druids/DruidGreen.jpg'

export class DruidCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  images = {
    [PlayerColor.Black]: druidBlack,
    [PlayerColor.Green]: druidGreen
  }
}

export const druidCardDescription = new DruidCardDescription()
