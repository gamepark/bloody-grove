import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class ChooseActionRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    return super.getPlayerMoves()
  }

}
