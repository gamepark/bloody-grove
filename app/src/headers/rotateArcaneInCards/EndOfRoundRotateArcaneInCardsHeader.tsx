import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundRotateArcaneInCardsHeader = (props: {grove: number}) => {
  return <HeaderText code="end-of-round-arcanes" values={{grove: props.grove}} />
}
