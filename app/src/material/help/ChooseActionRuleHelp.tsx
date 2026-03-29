import { Trans } from 'react-i18next'
import { components } from './utils.tsx'

export const ChooseActionRuleHelp = () => {
  return (
    <div>
      <h2><Trans defaults="Tour de jeu" /></h2>
      <p>
        <Trans defaults="À votre tour, choisissez entre deux actions :" />
      </p>

      <h3><Trans defaults="Invoquer un Esprit" /></h3>
      <p>
        <Trans
          components={{ ...components, bold: <strong/> }}
          defaults="Choisissez une carte Esprit de votre main et placez-la, face visible, sous le <bold>Bosquet actif</bold>."
        />
      </p>
      <p>
        <Trans
          components={components}
          defaults="S'il y a déjà des cartes Esprit sous ce Bosquet, posez-la sur la dernière, légèrement décalée pour que la <force /> force et le type de la carte soient toujours visibles."
        />
      </p>
      <p>
        <Trans
          components={components}
          defaults="Appliquez ensuite les éventuels effets de Ruse <ruse /> ou Arcane <arcane /> présents sur la carte."
        />
      </p>

      <h3><Trans defaults="Transformer votre Druide" /></h3>
      <p>
        <Trans
          defaults="Choisissez une carte Esprit de votre main et placez-la, face visible, à gauche ou à droite de votre carte Druide."
        />
      </p>
      <p>
        <Trans
          components={components}
          defaults="Pour chaque symbole Recrutement <recrutement /> complété, recrutez la carte Esprit Élite visible de l'animal concerné."
        />
      </p>
      <p>
        <Trans
          defaults="Pour chaque carte recrutée, vous avez le choix entre : l'ajouter à votre main, la mettre face cachée sous votre paquet, ou la mettre face cachée sur votre paquet."
        />
      </p>
      <p>
        <Trans
          components={{ ...components, bold: <strong/> }}
          defaults="La carte Esprit jouée est ensuite placée sur le Druide et devient votre <bold>Transformation</bold> actuelle : toutes vos cartes de ce type dans les Bosquets gagnent +1<force />."
        />
      </p>

      <p>
        <Trans
          defaults="Ensuite, avancez le cube sur la carte Manche. La personne dont le cube est de son côté commence son tour."
        />
      </p>
    </div>
  )
}
