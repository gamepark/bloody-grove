import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundRotateArcaneInCardsHeader = (props: {grove: number}) => {
  return <HeaderText code="header.end-of-round-arcanes" values={{grove: props.grove}} defaults={{
    you: "Fin de manche - révélation des jetons arcanes du bosquet {grove}",
    players: "Fin de manche - révélation des jetons arcanes du bosquet {grove}",
    player: "Fin de manche - révélation des jetons arcanes du bosquet {grove}",
  }}/>
}
