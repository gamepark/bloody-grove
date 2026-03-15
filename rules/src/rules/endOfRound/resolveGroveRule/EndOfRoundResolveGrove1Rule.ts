import { RuleId } from '../../RuleId'
import { EndOfRoundResolveGrovesRule } from '../EndOfRoundResolveGrovesRule'

export class EndOfRoundResolveGrove1Rule extends EndOfRoundResolveGrovesRule {
  actualGroveIndex = 1
  nextRuleIfEquality = RuleId.EndOfRoundRotateArcaneInCards2
  nextRuleIfMajority = RuleId.EndOfRoundTakeElderSpirit1
}
