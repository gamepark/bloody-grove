import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { ComponentType } from 'react'
import { ShowArcaneSimultaneousHeader } from './ShowArcaneSimultaneousHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ShowArcaneSimultaneous]: ShowArcaneSimultaneousHeader
}
