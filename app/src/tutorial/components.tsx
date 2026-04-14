/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import ForceIcone from '../images/icons/force.png'
import DominationIcone from '../images/icons/domination.png'
import ArcaneIcone from '../images/icons/arcane.png'
import RecrutementIcone from '../images/icons/recrutement.png'
import RuseIcone from '../images/icons/ruse.png'
import ElderPlaceCardIcone from '../images/icons/elder_place_card.png'
import ElderShowArcaneIcone from '../images/icons/elder_show_arcane.png'

export const mini = css`
  height: 1.2em;
  margin-bottom: -0.2em;
`

export const components = {
  force: <Picture src={ForceIcone} css={mini} />,
  domination: <Picture src={DominationIcone} css={mini} />,
  arcane: <Picture src={ArcaneIcone} css={mini} />,
  recrutement: <Picture src={RecrutementIcone} css={mini} />,
  ruse: <Picture src={RuseIcone} css={mini} />,
  elderPlaceCard: <Picture src={ElderPlaceCardIcone} css={mini} />,
  elderShowArcane: <Picture src={ElderShowArcaneIcone} css={mini} />
}
