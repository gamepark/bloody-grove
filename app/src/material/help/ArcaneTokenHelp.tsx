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
        <Trans i18nKey="arcane-token" defaults="Jeton Arcane" />
      </h2>

      <p>
        <Trans
          i18nKey="arcane-token.role"
          defaults="Lorsque vous jouez une carte Esprit possédant des emplacements Arcanes"
        />
        <Picture src={ArcaneIcone} css={mini} />
        <Trans
          i18nKey="arcane-token.role2"
          defaults=", vous pouvez placez un jeton arcane, face cachée, sur n'importe quelle carte Esprit dans les Bosquets — la vôtre ou celle de l'adversaire (sauf les Anciens). Il est révélé lors de la résolution du Bosquet et ajoute sa valeur à la Force totale du joueur propriétaire de la carte."
        />
      </p>
      <p>
        <Trans
          i18nKey="arcane-token.reveal"
          defaults="Tous les jetons Arcanes sont révélés simultanément lors de la résolution des Bosquets en fin de manche. L'effet de surprise peut complètement renverser le résultat !"
        />
      </p>

      {isDiscard ? (
        <>
          <p>
            <strong><Trans i18nKey="arcane-token.discard.title" defaults="Jeton Défausse" /></strong>
          </p>
          <p>
            <Trans
              i18nKey="arcane-token.discard.desc"
              defaults="Ce jeton ne donne aucun bonus de Force, la carte sur laquelle il est posée est immédiatement défaussée ainsi que tout les jetons arcanes présents sur elle."
            />
          </p>
        </>
      ) : (
        <>
          {value !== undefined && (
            <p>
              <strong><Trans i18nKey="arcane-token.value" defaults="Bonus de Force" /></strong>{': '}{value}<Picture src={ForceIcone} css={mini} />
            </p>
          )}
        </>
      )}
    </>
  )
}