import { RuleId } from '../../RuleId'
import { EndOfRoundRotateArcaneInCardsRule } from '../EndOfRoundRotateArcaneInCardsRule'

export class EndOfRoundRotateArcaneInCards1Rule extends EndOfRoundRotateArcaneInCardsRule {
  actualGroveIndex = 1
  nextRule = RuleId.EndOfRoundResolveGrove1
}
