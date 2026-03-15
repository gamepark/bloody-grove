import { HeaderText } from '@gamepark/react-game'

export const EndOfRoundSpiritCardsUnderDeckHeader = () => {
  return <HeaderText code="header.end-of-round-player-hand" defaults={{
    you: "Fin de manche - vous devez remettre les cartes Esprit au deck",
    players: "Fin de manche - les joueurs doivent remettre les cartes Esprit au deck",
    player: "Fin de manche - {player} doit remettre les cartes Esprit au deck",
  }}/>
}
