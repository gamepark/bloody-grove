import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const getNavigationCss = () => {
    return css`
          left: 31em;
          top: 8em;
        `
  }
  return (
    <>
      <GameTable xMin={-45} xMax={44} yMin={-20} yMax={20} margin={margin} css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation css={getNavigationCss()} />
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(1em + 6em * 1.7)" />}
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
