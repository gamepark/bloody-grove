import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerColor } from '../../PlayerColor'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class NextRuleHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  nextRule(): MaterialMove[] {
    const nextRules: RuleId[] | undefined = this.remind(Memory.NextRules) ?? []
    if (nextRules.length > 1) {
      this.memorize(Memory.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    if (nextRules.length > 0) {
      this.forget(Memory.NextRules)
      return [this.startRule(nextRules[0])]
    }
    return this.getNextTurn()
  }

  getNextTurn(): MaterialMove[] {
    const actualTurn = this.remind<number>(Memory.ActualTurn)
    const otherPlayer = this.player === PlayerColor.Black ? PlayerColor.Green : PlayerColor.Black
    switch (actualTurn) {
      case 1:
      case 3:
      case 5:
        return [this.startPlayerTurn(RuleId.ChooseAction, otherPlayer)]
      case 2:
      case 4:
        return [this.startRule(RuleId.ChooseAction)]
      case 6:
      default:
        return [this.startSimultaneousRule(RuleId.EndOfRoundSpiritCardsUnderDeck)]
    }
  }
}
