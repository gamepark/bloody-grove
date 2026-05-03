import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { RoundCardHelp } from './help/RoundCardHelp'
import roundCard1 from '../images/cards/RoundCard1.jpg'
import roundCard2 from '../images/cards/RoundCard2.jpg'

export class RoundCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  help = RoundCardHelp

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    const viewer = context.player ?? context.rules.players[0]
    const firstPlayer = item.location?.rotation ? PlayerColor.Green : PlayerColor.Black
    return viewer !== firstPlayer
  }

  image = roundCard1
  backImage = roundCard2
}

export const roundCardDescription = new RoundCardDescription()
