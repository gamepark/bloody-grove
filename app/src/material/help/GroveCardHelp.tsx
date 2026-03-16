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
        <Trans i18nKey="grove" defaults="Bosquet" />
      </h2>

      <p>
        <Trans
          i18nKey="grove.role"
          defaults="Les Bosquets sont les champs de bataille du jeu. Chaque manche, les deux joueurs peuvent y placer leurs cartes Esprit (une carte chacun par Bosquet). À la fin de la manche, on compare les Forces totales de chaque joueur sous ce Bosquet : le vainqueur en prend le contrôle."
        />
      </p>

      {groveType && (
        <p>
          <strong><Trans i18nKey="grove.type" values={{groveType}} defaults="Type : {groveType, select, bear{ours} fox{renard} other{hibou}}" /></strong>
          {' — '}
          <Trans
            i18nKey="grove.type.bonus"
            values={{groveType}}
            components={components}
            defaults="Toutes vos cartes Esprit {groveType, select, bear{ours} fox{renard} other{hibou}} gagnent +1<force /> Force lors de la résolution de ce Bosquet."
          />
        </p>
      )}

      <p>
        <strong><Trans i18nKey="grove.force-calc" defaults="Calcul de la Force" /></strong>
        {' : '}
        <Trans
          i18nKey="grove.force-calc.desc"
          components={components}
          defaults="Force de chaque carte + bonus de type Bosquet (+1<force />) + transformation du Druide (+1<force /> si même type) + jetons Arcanes révélés."
        />
      </p>

      <p>
        <strong><Trans i18nKey="grove.tie" defaults="Égalité" /></strong>
        {' : '}
        <Trans
          i18nKey="grove.tie.desc"
          defaults="En cas d'égalité, personne ne prend le contrôle du Bosquet. Le marqueur reste neutre."
        />
      </p>

      <p>
        <strong><Trans i18nKey="grove.victory-cond" defaults="Condition de victoire" /></strong>
        {' : '}
        <Trans
          i18nKey="grove.victory-cond.desc"
          components={components}
          defaults="Contrôler les 3 Bosquets à la fin d'une manche déclenche une victoire immédiate ! Sinon, après 4 manches, c'est la Domination (<domination />) totale qui départage les joueurs."
        />
      </p>
    </>
  )
}
