import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { arcaneTokenDescription } from './ArcaneTokenDescription.ts'
import { cubeDescription } from './CubeDescription.ts'
import { druidCardDescription } from './DruidCardDescription.ts'
import { elderSpiritCardDescription } from './ElderSpiritCardDescription.ts'
import { groveCardDescription } from './GroveCardDescription.ts'
import { roundCardDescription } from './RoundCardDescription.ts'
import { spiritCardDescription } from './SpiritCardDescription.ts'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.RoundCard]: roundCardDescription,
  [MaterialType.DruidCard]: druidCardDescription,
  [MaterialType.GroveCard]: groveCardDescription,
  [MaterialType.SpiritCard]: spiritCardDescription,
  [MaterialType.ElderSpiritCard]: elderSpiritCardDescription,
  [MaterialType.ArcaneToken]: arcaneTokenDescription,
  [MaterialType.Cube]: cubeDescription
}
