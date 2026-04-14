import { Trans } from 'react-i18next'
import { MaterialHelpProps } from '@gamepark/react-game'
import { GroveCard, getGroveType } from '@gamepark/bloody-grove/material/GroveCard'
import { components } from './utils.tsx'

export const GroveCardHelp = ({ item }: MaterialHelpProps) => {
  const groveId = item.id as GroveCard | undefined
  const groveType = groveId !== undefined ? getGroveType(groveId) : undefined

  return (
    <>
      <h2>
        <Trans i18nKey="grove" />
      </h2>

      <p>
        <Trans i18nKey="grove.role" />
      </p>

      {groveType && (
        <p>
          <strong>
            <Trans i18nKey="grove.type" values={{ groveType }} />
          </strong>
          {' — '}
          <Trans i18nKey="grove.type.bonus" values={{ groveType }} components={components} />
        </p>
      )}

      <p>
        <strong>
          <Trans i18nKey="grove.force-calc" />
        </strong>
        {' : '}
        <Trans i18nKey="grove.force-calc.desc" components={components} />
      </p>

      <p>
        <strong>
          <Trans i18nKey="grove.tie" />
        </strong>
        {' : '}
        <Trans i18nKey="grove.tie.desc" />
      </p>

      <p>
        <strong>
          <Trans i18nKey="grove.victory-cond" />
        </strong>
        {' : '}
        <Trans i18nKey="grove.victory-cond.desc" components={components} />
      </p>
    </>
  )
}
