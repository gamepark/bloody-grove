import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundResolveGrovesHeader = (props: {grove: number}) => {
  return <HeaderText code="header.end-of-round-groves" values={{grove: props.grove}} />
}
