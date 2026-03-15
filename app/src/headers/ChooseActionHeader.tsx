import { HeaderText } from '@gamepark/react-game'

export const ChooseActionHeader = () => {
  return <HeaderText code="header.choose-action" defaults={{
    you: "Choisissez une action : placez une carte Esprit sous le bosquet ou près du druide",
    players: "Les joueurs choisissent une action",
    player: "Le joueur {player} choisit une action",
  }}/>
}
