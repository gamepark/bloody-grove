import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { arcaneTokenDescription } from './ArcaneTokenDescription.tsx'
import { cubeDescription } from './CubeDescription.ts'
import { groveCardDescription } from './GroveCardDescription.ts'
import { roundCardDescription } from './RoundCardDescription.ts'
import { spiritCardDescription } from './SpiritCardDescription.tsx'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.RoundCard]: roundCardDescription,
  [MaterialType.GroveCard]: groveCardDescription,
  [MaterialType.SpiritCard]: spiritCardDescription,
  [MaterialType.ArcaneToken]: arcaneTokenDescription,
  [MaterialType.Cube]: cubeDescription
}
