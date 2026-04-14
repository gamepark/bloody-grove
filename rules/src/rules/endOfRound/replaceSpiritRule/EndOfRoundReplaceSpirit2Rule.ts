import { RuleId } from '../../RuleId'
import { EndOfRoundReplaceSpiritRule } from '../EndOfRoundReplaceSpiritRule'

export class EndOfRoundReplaceSpirit2Rule extends EndOfRoundReplaceSpiritRule {
  groveToPlaceSpirit = 2
  nextRule = RuleId.PrepareNextRound
}
