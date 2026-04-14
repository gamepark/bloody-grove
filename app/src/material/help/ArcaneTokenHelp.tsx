import { Trans } from 'react-i18next'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { ArcaneToken, getArcaneTokenValue } from '@gamepark/bloody-grove/material/ArcaneToken'
import ArcaneIcone from '../../images/icons/arcane.png'
import ForceIcone from '../../images/icons/force.png'
import { mini } from './utils.tsx'

export const ArcaneTokenHelp = ({ item }: MaterialHelpProps) => {
  const tokenId = item.id as ArcaneToken
  const value = typeof tokenId === 'number' ? getArcaneTokenValue(tokenId) : undefined
  const isDiscard = tokenId === ArcaneToken.ArcaneTokenDiscard

  return (
    <>
      <h2>
        <Trans i18nKey="arcane-token" />
      </h2>

      <p>
        <Trans i18nKey="arcane-token.role" />
        <Picture src={ArcaneIcone} css={mini} />
        <Trans i18nKey="arcane-token.role2" />
      </p>
      <p>
        <Trans i18nKey="arcane-token.reveal" />
      </p>

      {isDiscard ? (
        <>
          <p>
            <strong>
              <Trans i18nKey="arcane-token.discard.title" />
            </strong>
          </p>
          <p>
            <Trans i18nKey="arcane-token.discard.desc" />
          </p>
        </>
      ) : (
        <>
          {value !== undefined && (
            <p>
              <strong>
                <Trans i18nKey="arcane-token.value" />
              </strong>
              {': '}
              {value}
              <Picture src={ForceIcone} css={mini} />
            </p>
          )}
        </>
      )}
    </>
  )
}
