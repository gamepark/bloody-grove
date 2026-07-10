import { GroveCard } from '@gamepark/bloody-grove/material/GroveCard.ts'
import { CardDescription, MaterialContentProps } from '@gamepark/react-game'
import { GroveCardForces } from './GroveCardForces'
import { GroveCardHelp } from './help/GroveCardHelp'
import groveBear from '../images/cards/grove/GroveBear.jpg'
import groveFox from '../images/cards/grove/GroveFox.jpg'
import groveOwl from '../images/cards/grove/GroveOwl.jpg'

export class GroveCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.1

  help = GroveCardHelp

  images = {
    [GroveCard.GroveBear]: groveBear,
    [GroveCard.GroveFox]: groveFox,
    [GroveCard.GroveOwl]: groveOwl
  }

  content = (props: MaterialContentProps<GroveCard>) =>
    this.contentWithBackChildren({ ...props, children: <GroveCardForces itemIndex={props.itemIndex} /> })
}

export const groveCardDescription = new GroveCardDescription()
