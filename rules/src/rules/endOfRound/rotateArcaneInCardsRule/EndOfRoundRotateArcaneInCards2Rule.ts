import { RuleId } from '../../RuleId'
import { EndOfRoundRotateArcaneInCardsRule } from '../EndOfRoundRotateArcaneInCardsRule'

export class EndOfRoundRotateArcaneInCards2Rule extends EndOfRoundRotateArcaneInCardsRule {
  actualGroveIndex = 2
  nextRule = RuleId.EndOfRoundResolveGrove2
}
