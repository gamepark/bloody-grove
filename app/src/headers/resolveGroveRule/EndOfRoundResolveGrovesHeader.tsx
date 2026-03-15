import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundResolveGrovesHeader = (props: {grove: number}) => {
  return <HeaderText code="header.end-of-round-groves" values={{grove: props.grove}} defaults={{
    you: "Fin de manche - résolution du bosquet {grove}",
    players: "Fin de manche - résolution du bosquet {grove}",
    player: "Fin de manche - résolution du bosquet {grove}",
  }}/>
}
