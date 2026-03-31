/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Location } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const PlayerDeckContent = ({ location }: { location: Location }) => {
  const { t } = useTranslation()
  const label = location.x === 0 ? t('drop.deck.bottom') : t('drop.deck.top')
  return <span css={textStyle}>{label}</span>
}

const textStyle = css`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  text-shadow: 0 0 0.15em black, 0 0 0.3em black, 0 0 0.6em black;
`
