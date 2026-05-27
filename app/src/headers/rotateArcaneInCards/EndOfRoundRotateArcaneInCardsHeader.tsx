import { Trans } from 'react-i18next'

export const EndOfRoundRotateArcaneInCardsHeader = (props: { grove: number }) => {
  return <Trans i18nKey="header.end-of-round-arcanes" values={{ grove: props.grove }} />
}
