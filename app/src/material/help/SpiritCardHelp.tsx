import { SpiritCard, spiritCardData, SpiritCardData, SpiritCardId, SpiritType } from '@gamepark/bloody-grove/material/SpiritCard'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import ArcaneIcone from '../../images/icons/arcane.png'
import DominationIcone from '../../images/icons/domination.png'
import ForceIcone from '../../images/icons/force.png'
import RecrutementIcone from '../../images/icons/recrutement.png'
import RuseIcone from '../../images/icons/ruse.png'
import { components, mini } from './utils.tsx'

export const SpiritCardHelp = ({ item }: MaterialHelpProps) => {
  const spiritCardId = item.id as SpiritCardId
  const cardId = spiritCardId?.front
  const backType = spiritCardId?.back % 100
  const cardData = cardId ? spiritCardData[cardId] : undefined

  return (
    <>
      <h2>
        <Trans i18nKey="help.spirit-card.title" values={{cardType: cardData?.type}} defaults="Carte {cardType, select, druid{Druide} elder{esprit vénérable} bear{esprit ours} fox{esprit renard} other{esprit hibou}}" />
      </h2>
      <BackTypeHelp backType={backType} />

      {cardData && cardData.type === 'druid' && <DruidHelp />}
      {cardData && cardData.type !== 'druid' && cardData.type !== 'elder' && (
        <StandardSpiritHelp cardData={cardData} />
      )}
      {cardData && cardData.type === 'elder' && (
        <ElderSpiritHelp cardId={cardId!} cardData={cardData} />
      )}
    </>
  )
}

const DruidHelp = () => (
  <>
    <p>
      <Trans
        i18nKey="spirit-card.druid.near.desc"
        components={components}
        defaults="Quand vous placez une carte Esprit à gauche ou à droite de votre Druide, les symboles recrutement (<recrutement />) complets vous permettent de recruter immédiatement une carte Élite du type correspondant. La carte jouée est ensuite placée sur le druide et devient votre transformation, toutes vos cartes de ce type dans les Bosquets gagnent +1<force /> !"
      />
    </p>
  </>
)

const StandardSpiritHelp = ({ cardData }: { cardData: SpiritCardData }) => {
  const force = cardData.force([])
  const dominations = cardData.dominations([])

  return (
    <>

      <p>
        <strong><Trans i18nKey="spirit-card.type" values={{groveType: cardData.type}} defaults="Type : {groveType, select, bear{ours} fox{renard} other{hibou}}" /></strong>
        <Trans i18nKey="spirit-card.type.bonus.note" components={components} defaults=" (les cartes du même type que le Bosquet reçoivent +1<force />)" />
      </p>

      <p>
        <strong><Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" defaults="Force" /></strong>{': '}{force}
      </p>

      {cardData.arcanes > 0 && (
        <p>
          <strong><Picture src={ArcaneIcone} css={mini} /> <Trans i18nKey="spirit-card.arcanes" defaults="Emplacements Arcanes" /></strong>{': '}{cardData.arcanes}
          {' — '}
          <Trans
            i18nKey="spirit-card.arcanes.desc"
            defaults="Quand vous jouez cette carte sous un Bosquet, vous pouvez placer secrètement un jeton Arcane sur n'importe quelle carte Esprit dans les Bosquets (y compris adverse). Révélé lors de la résolution !"
          />
        </p>
      )}

      {cardData.ruses > 0 && (
        <p>
          <strong><Picture src={RuseIcone} css={mini} /> <Trans i18nKey="spirit-card.ruses" defaults="Ruses" /></strong>{': '}{cardData.ruses}
          {' — '}
          <Trans
            i18nKey="spirit-card.ruses.desc"
            defaults="Quand vous jouez cette carte sous un Bosquet, vous pouvez déplacer une de vos cartes Esprit d'un Bosquet vers un autre. Utilisable ou passable."
          />
        </p>
      )}

      {(cardData.leftIncantations.length > 0 || cardData.rightIncantations.length > 0) && (
        <p>
          <strong><Picture src={RecrutementIcone} css={mini} /> <Trans i18nKey="spirit-card.incantations" defaults="Incantations" /></strong>
          {' — '}
          <Trans
            i18nKey="spirit-card.incantations.desc"
            components={components}
            defaults="Ces symboles servent au recrutement : quand vous placez cette carte à côté de votre Druide, pour chaque symbole recrutement <recrutement /> assemblés, vous pouvez recruter des cartes Élite du type correspondant."
          />
        </p>
      )}
      <p>
        <strong><Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" defaults="Domination" /></strong>{': '}{dominations}
      </p>
    </>
  )
}

const ElderSpiritHelp = ({ cardId, cardData }: { cardId: SpiritCard, cardData: SpiritCardData}) => {
  const force = cardData.force([])
  const dominations = cardData.dominations([])
  const hasEffects = cardData.effects && cardData.effects.length > 0

  return (
    <>
      <p>
        {
          cardId === SpiritCard.ElderSpirit3 ? (
            <>
              <strong><Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" defaults="Force" /></strong>{': '}
              <Trans i18nKey='spirit-card.elder-spirit-3.force' components={components} defaults="1<force /> par carte esprits vénérables, vous appartenant, dans le même bosquet" />
            </>
          ) : (
            <>
              <strong><Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" defaults="Force" /></strong>{': '}{force}
            </>
          )
        }
      </p>

      <p>
        {
          cardId === SpiritCard.ElderSpiritRed1 ? (
            <>
              <strong><Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" defaults="Domination" /></strong>{': '}
              <Trans i18nKey='spirit-card.elder-spirit-red-1.dominations' components={components} defaults="1<domination /> par carte esprits élite ou de base différents, vous appartenant, dans le même bosquet" />
            </>
          ) : cardId === SpiritCard.ElderSpiritRed2 ?
            (
              <>
                <strong><Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" defaults="Domination" /></strong>{': '}
                <Trans i18nKey='spirit-card.elder-spirit-red-2.dominations' components={components} defaults="1<domination /> par carte esprits vénérables, vous appartenant, dans le même bosquet" />
              </>
            ) :
            (
              <>
                <strong><Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" defaults="Domination" /></strong>{': '}{dominations}
              </>
            )
        }
      </p>

      {hasEffects && (
        <>
          <p>
            <strong>⚡ <Trans i18nKey="spirit-card.effects" defaults="Effets à la pose" /></strong>
          </p>
          <ul style={{listStyle: 'none'}}>
            {cardData.effects!.map((effect, i) => (
              <li key={i}>
                {effect === RuleId.ElderEffectShowArcane && (
                  <Trans i18nKey="elder.effect.show-arcane" components={components} defaults="<elderShowArcane /> Immédiatement après la pose, prenez connaissance d'une jeton arcane, face cachée de la réserve, puis replacez le dans la réserve." />
                )}
                {effect === RuleId.ElderEffectTakeSpirit && (
                  <Trans i18nKey="elder.effect.take-spirit" components={components} defaults="<recrutement /> Immédiatement après la pose, recrutez une carte esprit élite du type de votre choix et posée la sur le dessus ou dessous votre deck" />
                )}
                {effect === RuleId.ElderEffectPlaceCardUnderDeckInGrove && (
                  <Trans i18nKey="elder.effect.place-under-deck" components={components} defaults="<elderPlaceCard /> Immédiatement après la pose, prenez la carte du dessous de votre deck et placez la dans le bosquet de cet esprit vénérable" />
                )}
            </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

const BackTypeHelp = ({ backType }: { backType: SpiritType }) => {
  switch (backType) {
    case SpiritType.Base:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.base.desc"
            defaults="Une carte Esprit de base. Ces cartes constituent votre deck de départ et peuvent être placées sous les Bosquets ou à côté du Druide pour recruter des Élites."
          />
        </p>
      )
    case SpiritType.Bear:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.bear-elite.desc"
            defaults="Une carte Esprit Ours Élite. Recrutée en utilisant les incantations Ours de votre Druide. Généralement orientée Force brute."
          />
        </p>
      )
    case SpiritType.Fox:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.fox-elite.desc"
            defaults="Une carte Esprit Renard Élite. Recrutée en utilisant les incantations Renard de votre Druide. Généralement orientée Ruses et Arcanes."
          />
        </p>
      )
    case SpiritType.Owl:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.owl-elite.desc"
            defaults="Une carte Esprit Hibou Élite. Recrutée en utilisant les incantations Hibou de votre Druide. Généralement orientée Arcanes secrets."
          />
        </p>
      )
    case SpiritType.Elder:
    case SpiritType.ElderRed:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.elder.desc"
            defaults="Une carte Esprit Ancien. Disponible dans la rivière commune. Elle apporte Domination et effets spéciaux à la pose."
          />
        </p>
      )
    default:
      return (
        <p>
          <Trans
            i18nKey="spirit-card.druid.desc"
            defaults="Le Druide est votre carte de commandement. Il ne combat pas directement (Force 0), mais il est indispensable pour recruter de nouvelles cartes et amplifier vos forces."
          />
        </p>
      )
  }
}
