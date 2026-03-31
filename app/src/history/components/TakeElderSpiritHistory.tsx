import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { SpiritCardId } from '@gamepark/bloody-grove/material/SpiritCard.ts'
import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeElderSpiritHistory = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(context.action.playerId)
  const card = new BloodyGroveRules(context.game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
  const groveId = move.location.id + 1

  return (
    <Trans
      i18nKey="log.spirit.take-elder"
      values={{ player, groveId }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.SpiritCard, card)} transient />
      }}
    />
  )
}
