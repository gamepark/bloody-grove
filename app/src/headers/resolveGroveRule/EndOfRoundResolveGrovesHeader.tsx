import { Trans } from 'react-i18next'

export const EndOfRoundResolveGrovesHeader = (props: { grove: number }) => {
  return <Trans i18nKey="header.end-of-round-groves" values={{ grove: props.grove }} />
}
