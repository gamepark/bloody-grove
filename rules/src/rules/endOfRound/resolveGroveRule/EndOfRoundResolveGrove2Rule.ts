import { RuleId } from '../../RuleId'
import { EndOfRoundResolveGrovesRule } from '../EndOfRoundResolveGrovesRule'

export class EndOfRoundResolveGrove2Rule extends EndOfRoundResolveGrovesRule {
  actualGroveIndex = 2
  nextRuleIfEquality = RuleId.PrepareNextRound
  nextRuleIfMajority = RuleId.EndOfRoundTakeElderSpirit2
}
