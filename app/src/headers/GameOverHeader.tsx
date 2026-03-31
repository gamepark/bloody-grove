/** @jsxImportSource @emotion/react */
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules.ts'
import { EndOfGameHelper } from '@gamepark/bloody-grove/rules/helper/EndOfGameHelper.ts'
import { usePlayerName, useRankedPlayers, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const GameOverHeader = () => {
  const rules = useRules<BloodyGroveRules>()!
  const rankedPlayers = useRankedPlayers()
  const firstPlayer = rankedPlayers[0]
  const winnerName = usePlayerName(firstPlayer.id)
  const winWithAllGroves = new EndOfGameHelper(rules.game).onePlayerHaveAllGroves()

  if (winWithAllGroves) {
    return <Trans i18nKey="header.end.grove.player" values={{ player: winnerName }} />
  }

  const winnerScore = new EndOfGameHelper(rules.game).getScore(firstPlayer.id as number)
  const loserScore = new EndOfGameHelper(rules.game).getScore(rankedPlayers[1].id as number)

  if (winnerScore > loserScore) {
    return <Trans i18nKey="header.end.score.player" values={{ player: winnerName, winnerScore, loserScore }} />
  }

  const winnerTransformations = new EndOfGameHelper(rules.game).getPlayerTransformations(firstPlayer.id as number)
  const loserTransformations = new EndOfGameHelper(rules.game).getPlayerTransformations(rankedPlayers[1].id as number)

  if (winnerTransformations > loserTransformations) {
    return <Trans i18nKey="header.end.transformations.player" values={{ player: winnerName, winnerTransformations, loserTransformations }} />
  }

  return <Trans i18nKey="result.comp.tie.all" />
}
