import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { useLegalMove, PlayMoveButton, usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { CustomMoveType } from '@gamepark/bloody-grove/rules/CustomMoveType'
import { isCustomMoveType } from '@gamepark/rules-api'

export const PlaceArcaneHeader = () => {
  const player = usePlayerId()
  const rules = useRules<BloodyGroveRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans
      i18nKey="header.place-arcane.you"
      defaults="Placez un jeton arcane ou <pass>Passer</pass>"
      components={{
        pass: <PlayMoveButton move={pass}/>
      }}
    />
  }

  return <Trans
    i18nKey="header.place-arcane.player"
    defaults="Le joueur {player} place un jeton arcane"
    values={{ player: name }}
  />
}
