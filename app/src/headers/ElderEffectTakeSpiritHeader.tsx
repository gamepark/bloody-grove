import { HeaderText } from '@gamepark/react-game'

export const ElderEffectTakeSpiritHeader = () => {
  return <HeaderText code="elder.take-spirit" defaults={{
    you: "Esprit venerable : Prenez une carte Esprit",
    player: "Esprit venerable : le joueur {player} prend une carte Esprit",
  }}/>
}
