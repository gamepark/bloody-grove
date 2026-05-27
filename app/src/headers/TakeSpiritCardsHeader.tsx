import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { Memory } from '@gamepark/bloody-grove/rules/Memory'
import { HeaderText, useRules } from '@gamepark/react-game'

export const TakeSpiritCardsHeader = () => {
  const rules = useRules<BloodyGroveRules>()!
  const count = (rules.remind<string[]>(Memory.SpiritCardsToTake) ?? []).length
  return <HeaderText code="take-spirit-cards" values={{ count }} />
}
