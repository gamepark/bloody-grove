import { HeaderText } from '@gamepark/react-game'

export const TakeSpiritCardsHeader = () => {
  return <HeaderText code="header.take-spirit-cards" defaults={{
    you: "Prenez les cartes Esprit (main ou deck)",
    players: "Les joueurs prennent les cartes Esprit",
    player: "Le joueur {player} prend les cartes Esprit",
  }}/>
}
