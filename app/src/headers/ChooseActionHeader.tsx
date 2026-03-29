import { HeaderText } from '@gamepark/react-game'

export const ChooseActionHeader = () => {
  return <HeaderText code="header.choose-action" defaults={{
    you: "Invoquez un Esprit ou Transformez votre druide",
    player: "{player} invoque un Esprit ou Transforme son druide",
  }}/>
}
