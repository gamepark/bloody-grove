import { GroveCard } from '@gamepark/bloody-grove/material/GroveCard.ts'
import { CardDescription } from '@gamepark/react-game'
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
}

export const groveCardDescription = new GroveCardDescription()
