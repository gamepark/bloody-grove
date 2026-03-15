import { RuleId } from '../../RuleId'
import { EndOfRoundRotateArcaneInCardsRule } from '../EndOfRoundRotateArcaneInCardsRule'

export class EndOfRoundRotateArcaneInCards0Rule extends EndOfRoundRotateArcaneInCardsRule {
  actualGroveIndex = 0
  nextRule = RuleId.EndOfRoundResolveGrove0
}
