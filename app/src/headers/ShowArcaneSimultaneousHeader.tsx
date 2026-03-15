import { HeaderText } from '@gamepark/react-game'

export const ShowArcaneSimultaneousHeader = () => {
  return <HeaderText code="header.show-arcane-simultaneous" defaults={{
    you: "Vous devez regarder un jeton arcane",
    players: "Les joueurs doivent regarder un jeton arcane",
    player: "Le joueur {player} doit regarder un jeton arcane",
  }}/>
}
