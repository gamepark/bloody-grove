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
        <Trans i18nKey="help.spirit-card.title" values={{ cardType: cardData?.type }} />
      </h2>
      <BackTypeHelp backType={backType} />

      {cardData && cardData.type === 'druid' && <DruidHelp />}
      {cardData && cardData.type !== 'druid' && cardData.type !== 'elder' && <StandardSpiritHelp cardData={cardData} />}
      {cardData && cardData.type === 'elder' && <ElderSpiritHelp cardId={cardId!} cardData={cardData} />}
    </>
  )
}

const DruidHelp = () => (
  <>
    <p>
      <Trans i18nKey="spirit-card.druid.near.desc" components={components} />
    </p>
  </>
)

const StandardSpiritHelp = ({ cardData }: { cardData: SpiritCardData }) => {
  const force = cardData.force([])
  const dominations = cardData.dominations([])

  return (
    <>
      <p>
        <strong>
          <Trans i18nKey="spirit-card.type" values={{ groveType: cardData.type }} />
        </strong>
        <Trans i18nKey="spirit-card.type.bonus.note" components={components} />
      </p>

      <p>
        <strong>
          <Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" />
        </strong>
        {': '}
        {force}
        {' — '}
        <Trans i18nKey="spirit-card.force.desc" />
      </p>

      {cardData.arcanes > 0 && (
        <p>
          <strong>
            <Picture src={ArcaneIcone} css={mini} /> <Trans i18nKey="spirit-card.arcanes" />
          </strong>
          {': '}
          {cardData.arcanes}
          {' — '}
          <Trans i18nKey="spirit-card.arcanes.desc" />
        </p>
      )}

      {cardData.ruses > 0 && (
        <p>
          <strong>
            <Picture src={RuseIcone} css={mini} /> <Trans i18nKey="spirit-card.ruses" />
          </strong>
          {': '}
          {cardData.ruses}
          {' — '}
          <Trans i18nKey="spirit-card.ruses.desc" />
        </p>
      )}

      {(cardData.leftIncantations.length > 0 || cardData.rightIncantations.length > 0) && (
        <p>
          <strong>
            <Picture src={RecrutementIcone} css={mini} /> <Trans i18nKey="spirit-card.incantations" />
          </strong>
          {' — '}
          <Trans i18nKey="spirit-card.incantations.desc" components={components} />
        </p>
      )}
      <p>
        <strong>
          <Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" />
        </strong>
        {': '}
        {dominations}
        {' — '}
        <Trans i18nKey="spirit-card.dominations.desc" />
      </p>
    </>
  )
}

const ElderSpiritHelp = ({ cardId, cardData }: { cardId: SpiritCard; cardData: SpiritCardData }) => {
  const force = cardData.force([])
  const dominations = cardData.dominations([])
  const hasEffects = cardData.effects && cardData.effects.length > 0
  const effects = cardData.effects ?  [...new Set(cardData.effects)] : []

  return (
    <>
      <p>
        {cardId === SpiritCard.ElderSpirit3 ? (
          <>
            <strong>
              <Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" />
            </strong>
            {': '}
            <Trans i18nKey="spirit-card.elder-spirit-3.force" components={components} />
          </>
        ) : (
          <>
            <strong>
              <Picture src={ForceIcone} css={mini} /> <Trans i18nKey="spirit-card.force" />
            </strong>
            {': '}
            {force}
            {' — '}
            <Trans i18nKey="spirit-card.force.desc" />
          </>
        )}
      </p>

      <p>
        {cardId === SpiritCard.ElderSpiritRed1 ? (
          <>
            <strong>
              <Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" />
            </strong>
            {': '}
            <Trans i18nKey="spirit-card.elder-spirit-red-1.dominations" components={components} />
          </>
        ) : cardId === SpiritCard.ElderSpiritRed2 ? (
          <>
            <strong>
              <Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" />
            </strong>
            {': '}
            <Trans i18nKey="spirit-card.elder-spirit-red-2.dominations" components={components} />
          </>
        ) : (
          <>
            <strong>
              <Picture src={DominationIcone} css={mini} /> <Trans i18nKey="spirit-card.dominations" />
            </strong>
            {': '}
            {dominations}
            {' — '}
            <Trans i18nKey="spirit-card.dominations.desc" />
          </>
        )}
      </p>

      {hasEffects && (
        <>
          <p>
            <strong>
              ⚡ <Trans i18nKey="spirit-card.effects" />
            </strong>
          </p>
          <ul style={{ listStyle: 'none' }}>
            {effects.map((effect, i) => (
              <li key={i}>
                {effect === RuleId.ElderEffectShowArcane && <Trans i18nKey="elder.effect.show-arcane" components={components} />}
                {effect === RuleId.ElderEffectTakeSpirit && <Trans i18nKey="elder.effect.take-spirit" components={components} />}
                {effect === RuleId.ElderEffectPlaceCardUnderDeckInGrove && <Trans i18nKey="elder.effect.place-under-deck" components={components} />}
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
          <Trans i18nKey="spirit-card.base.desc" />
        </p>
      )
    case SpiritType.Bear:
      return (
        <p>
          <Trans i18nKey="spirit-card.bear-elite.desc" />
        </p>
      )
    case SpiritType.Fox:
      return (
        <p>
          <Trans i18nKey="spirit-card.fox-elite.desc" />
        </p>
      )
    case SpiritType.Owl:
      return (
        <p>
          <Trans i18nKey="spirit-card.owl-elite.desc" />
        </p>
      )
    case SpiritType.Elder:
    case SpiritType.ElderRed:
      return (
        <p>
          <Trans i18nKey="spirit-card.elder.desc" />
        </p>
      )
    default:
      return (
        <p>
          <Trans i18nKey="spirit-card.druid.desc" />
        </p>
      )
  }
}
