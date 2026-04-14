import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { MaterialContext } from '@gamepark/react-game'

export const getContextPlayer = (context: MaterialContext) => context.player ?? context.rules.players[0]

export const isPlayerBlack = (contextPlayer?: PlayerColor) => {
  return contextPlayer === PlayerColor.Black
}
