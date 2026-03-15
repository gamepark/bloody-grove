import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundTakeElderSpiritHeader = (props: {grove: number}) => {
  return <HeaderText code="header.end-of-round-take-elder-spirit" values={{grove: props.grove}} defaults={{
    you: "Fin de manche - Choisisser une carte esprit venerable à placer dans le bosquet {grove}",
    player: "Fin de manche - {player} choisit une carte esprit venerable à placer dans le bosquet {grove}",
  }}/>
}
