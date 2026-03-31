import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlaceArcaneHistory = ({ context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(context.action.playerId)

  return (
    <Trans
      i18nKey="log.arcane.place"
      values={{ player }}
    />
  )
}
