import { css } from '@emotion/react'
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { EndOfGameHelper } from '@gamepark/bloody-grove/rules/helper/EndOfGameHelper.ts'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import Panel1 from '../images/panels/panel1.png'
import Panel2 from '../images/panels/panel2.png'
import Domination from '../images/icons/domination.png'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<BloodyGroveRules>()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          backgroundImage={images[player.id]}
          css={panelPosition(index)}
          activeRing
          counters={[
            {
              image: Domination,
              value: rules ? new EndOfGameHelper(rules.game).getScore(player.id) : 0
            }
          ]}
        />
      ))}
    </>,
    root
  )
}

const panelPosition = (index: number) => {
  if (index === 0) {
    return css`
      position: absolute;
      left: 1em;
      bottom: 2.5em;
      width: 28em;
    `
  }
  return css`
    position: absolute;
    left: 1em;
    top: 8.5em;
    width: 28em;
  `
}


const images: Record<PlayerColor, string> = {
  1: Panel1,
  2: Panel2
}