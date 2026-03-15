import { RuleId } from '../../RuleId'
import { EndOfRoundResolveGrovesRule } from '../EndOfRoundResolveGrovesRule'

export class EndOfRoundResolveGrove0Rule extends EndOfRoundResolveGrovesRule {
  actualGroveIndex = 0
  nextRuleIfEquality = RuleId.EndOfRoundRotateArcaneInCards1
  nextRuleIfMajority = RuleId.EndOfRoundTakeElderSpirit0
}
