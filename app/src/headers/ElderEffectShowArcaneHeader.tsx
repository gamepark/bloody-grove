import { HeaderText } from '@gamepark/react-game'

export const ElderEffectShowArcaneHeader = () => {
  return <HeaderText code="elder.card-under-deck" defaults={{
    you: "Esprit venerable : Regardez un jeton arcane",
    player: "Esprit venerable : le joueur {player} regarde un jeton arcane",
  }}/>
}
