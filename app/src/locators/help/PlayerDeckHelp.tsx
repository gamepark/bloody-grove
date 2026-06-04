/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { LocationHelpProps, MaterialComponent, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export function PlayerDeckHelp({ location }: LocationHelpProps) {
  const rules = useRules<BloodyGroveRules>()!
  const playerName = usePlayerName(location.player)
  const cards = rules.material(MaterialType.SpiritCard).location(LocationType.PlayerDeck).player(location.player)
  const count = cards.length

  return (
    <>
      <h2>
        <Trans i18nKey="help.deck.title" values={{ player: playerName }} />
      </h2>
      <p>
        <Trans i18nKey="help.deck.count" values={{ count }} />
      </p>
      {count > 0 && (
        <ol css={grid}>
          {cards.entries.map(([index, card]) => (
            <li key={index}>
              <MaterialComponent type={MaterialType.SpiritCard} itemId={card.id} style={{ transform: 'rotateY(180deg)' }} />
            </li>
          ))}
        </ol>
      )}
    </>
  )
}

const grid = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  gap: 0.6em;
  padding: 0.3em 0 0.5em;
  margin: 0.5em 0 0;
  font-size: 0.55em;

  li {
    display: flex;
  }
`
