/** @jsxImportSource @emotion/react */
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { EndOfGameHelper } from '@gamepark/bloody-grove/rules/helper/EndOfGameHelper.ts'
import { usePlayerName, useRankedPlayers, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils.tsx'

export const GameOverHeader = () => {
  const rules = useRules<BloodyGroveRules>()!
  const rankedPlayers = useRankedPlayers()
  const firstPlayer = rankedPlayers[0]
  const winnerName = usePlayerName(firstPlayer.id)
  const endOfGameHelper = new EndOfGameHelper(rules.game)
  const winWithAllGroves = endOfGameHelper.onePlayerHaveAllGroves()

  if (winWithAllGroves) {
    return <Trans i18nKey="header.end.grove.player" values={{ player: winnerName }} />
  }

  const winnerScore = endOfGameHelper.getScore(firstPlayer.id as number)
  const loserScore = endOfGameHelper.getScore(rankedPlayers[1].id as number)

  if (winnerScore > loserScore) {
    return <Trans i18nKey="header.end.domination.player" values={{ player: winnerName, winnerScore, loserScore }} components={components} />
  }

  const winnerTransformations = endOfGameHelper.getPlayerTransformations(firstPlayer.id as number)
  const loserTransformations = endOfGameHelper.getPlayerTransformations(rankedPlayers[1].id as number)

  if (winnerTransformations > loserTransformations) {
    return <Trans i18nKey="header.end.transformations.player" values={{ player: winnerName, winnerTransformations, loserTransformations }} />
  }

  return <Trans i18nKey="result.comp.tie.all" />
}
