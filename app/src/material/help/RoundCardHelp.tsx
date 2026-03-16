import { Trans } from 'react-i18next'
import { components } from './utils.tsx'

export const RoundCardHelp = () => {
  return (
    <>
      <h2>
        <Trans i18nKey="round-card" defaults="Carte Manche" />
      </h2>

      <p>
        <Trans
          i18nKey="round-card.role"
          defaults="Cette carte indique le joueur actif. La case 1 est tournée du coté du premier joueur de la manche en cours. Le marqueur se déplace sur la piste et le joueur actif est le joueur du même coté que le marqueur. Le premier joueur alterne à chaque nouvelle manche."
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.duration" defaults="Durée de la partie" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.duration.desc"
          defaults="La partie dure 4 manches au maximum. Chaque manche comprend 6 tours (2 par Bosquet)"
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.end-early" defaults="Victoire immédiate" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.end-early.desc"
          defaults="Si un joueur contrôle les 3 Bosquets à la fin d'une manche, la partie se termine immédiatement — il n'est pas nécessaire d'aller jusqu'à la 4e manche !"
        />
      </p>

      <p>
        <strong><Trans i18nKey="round-card.scoring" defaults="Victoire" /></strong>
        {' : '}
        <Trans
          i18nKey="round-card.scoring.desc"
          components={components}
          defaults="Après 4 manches sans vainqueur évident, le joueur ayant accumulé le plus de points de Domination (<domination />) avec ses cartes Esprit en jeu remporte la partie."
        />
      </p>
    </>
  )
}
