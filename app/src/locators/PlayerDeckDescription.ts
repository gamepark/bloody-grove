import { css } from '@emotion/react'
import { DropAreaDescription } from '@gamepark/react-game'
import { PlayerDeckContent } from './PlayerDeckContent'

export class PlayerDeckDescription extends DropAreaDescription {
  width = 6.3
  height = 5
  borderRadius = 0.4
  content = PlayerDeckContent
  extraCss = css`
    background: rgba(255, 255, 255, 0.5);
  `
}
