import { Trans } from 'react-i18next'
import { components } from './utils.tsx'

export const RoundCardHelp = () => {
  return (
    <>
      <h2>
        <Trans i18nKey="round-card" />
      </h2>

      <p>
        <Trans
          i18nKey="round-card.role"
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.duration" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.duration.desc"
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.end-early" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.end-early.desc"
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.scoring" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.scoring.desc"
          components={components}
        />
      </p>
    </>
  )
}
