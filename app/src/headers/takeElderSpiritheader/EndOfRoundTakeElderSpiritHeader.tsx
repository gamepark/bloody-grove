import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundTakeElderSpiritHeader = (props: {grove: number}) => {
  return <HeaderText code="header.end-of-round-take-elder-spirit" values={{grove: props.grove}} />
}
