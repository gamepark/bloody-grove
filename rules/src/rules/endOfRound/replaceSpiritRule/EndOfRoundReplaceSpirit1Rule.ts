import { RuleId } from '../../RuleId'
import { EndOfRoundReplaceSpiritRule } from '../EndOfRoundReplaceSpiritRule'

export class EndOfRoundReplaceSpirit1Rule extends EndOfRoundReplaceSpiritRule {
  groveToPlaceSpirit = 1
  nextRule = RuleId.EndOfRoundRotateArcaneInCards2
}
