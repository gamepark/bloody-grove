import { Trans, useTranslation } from 'react-i18next'
import { MaterialHelpProps, Picture, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { GroveCard, getGroveType } from '@gamepark/bloody-grove/material/GroveCard'
import { GroveHelper } from '@gamepark/bloody-grove/rules/helper/GroveHelper'
import { components, mini } from './utils.tsx'
import ForceIcone from '../../images/icons/force.png'

export const GroveCardHelp = ({ item, itemIndex }: MaterialHelpProps) => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame>()
  const groveId = item.id as GroveCard | undefined
  const groveType = groveId !== undefined ? getGroveType(groveId) : undefined
  const groveHelper = game ? new GroveHelper(game) : null

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

      {groveHelper && itemIndex !== undefined && game && game.players.length > 0 && (
        <>
          <p>
            <strong><Trans i18nKey="grove.player-force" /></strong>
          </p>
          {(game.players as number[]).map(player => (
            <p key={player}>
              <Trans
                i18nKey="grove.player-force.line"
                values={{ player: t(`player.${player}`), force: groveHelper.calculatePlayerForceForGrove(player, itemIndex) }}
                components={{ forceIcon: <Picture src={ForceIcone} css={mini} /> }}
              />
            </p>
          ))}
        </>
      )}
    </>
  )
}
