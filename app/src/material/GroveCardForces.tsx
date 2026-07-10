import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor.ts'
import { GroveHelper } from '@gamepark/bloody-grove/rules/helper/GroveHelper.ts'
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { Picture, usePlayerId, useRules } from '@gamepark/react-game'
import { isPlayerBlack } from '../locators/utils.ts'
import forceIcon from '../images/icons/force.png'

export const GroveCardForces = ({ itemIndex }: { itemIndex?: number }) => {
  const rules = useRules<BloodyGroveRules>()
  const viewer = usePlayerId<PlayerColor>() ?? rules?.players[0]
  if (!rules || itemIndex === undefined || viewer === undefined) return null
  const groveHelper = new GroveHelper(rules.game)
  const viewerIsBlack = isPlayerBlack(viewer)
  const bottomPlayer = viewerIsBlack ? PlayerColor.Black : PlayerColor.Green
  const topPlayer = viewerIsBlack ? PlayerColor.Green : PlayerColor.Black
  // GrovesRiverLocator rotates the card itself by -90deg for the Black viewer and +90deg
  // for the Green viewer (a 180deg difference), so the badge rotation and left/right side
  // must mirror accordingly to stay upright and on the correct edge for both viewers.
  const rotation = viewerIsBlack ? 90 : 270
  const topPositionCss = viewerIsBlack ? badgePositionCss.right : badgePositionCss.left
  const bottomPositionCss = viewerIsBlack ? badgePositionCss.left : badgePositionCss.right
  return (
    <>
      <ForceBadge positionCss={topPositionCss} rotation={rotation} force={groveHelper.calculatePlayerForceForGrove(topPlayer, itemIndex)} />
      <ForceBadge positionCss={bottomPositionCss} rotation={rotation} force={groveHelper.calculatePlayerForceForGrove(bottomPlayer, itemIndex)} />
    </>
  )
}

const ForceBadge = ({ force, positionCss, rotation }: { force: number; positionCss: ReturnType<typeof css>; rotation: number }) => (
  <div css={[badgeCss(rotation), positionCss]}>
    <Picture src={forceIcon} css={badgeIconCss} />
    <span>{force}</span>
  </div>
)

const badgeCss = (rotation: number) => css`
  position: absolute;
  transform: rotate(${rotation}deg);
  bottom: 44%;
  display: flex;
  align-items: center;
  gap: 0.15em;
  padding: 0.1em 0.3em;
  background: rgba(255, 255, 255, 0.85);
  border: 0.05em solid black;
  border-radius: 1em;
  font-size: 0.8em;
  font-weight: bold;
  color: black;
  line-height: 1;
`

const badgeIconCss = css`
  height: 1em;
`

const badgePositionCss = {
  left: css`
    left: 0;
  `,
  right: css`
    right: 0;
  `
}
