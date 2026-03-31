import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType.ts'
import { spiritCardData, SpiritCardId } from '@gamepark/bloody-grove/material/SpiritCard.ts'
import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeSpiritAndPlaceOnHandHistory = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const player = usePlayerName(context.action.playerId)
  const card = new BloodyGroveRules(context.game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
  const cardType = card?.id?.front ? spiritCardData[card.id.front].type : undefined

  return (
    <Trans
      i18nKey="log.spirit.take-spirit-on-hand"
      values={{ player, cardType }}
      components={{
        card: <PlayMoveButton move={displayMaterialHelp(MaterialType.SpiritCard, card)} transient />
      }}
    />
  )
}
