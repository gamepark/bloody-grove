import { RuleId } from '../../RuleId'
import { EndOfRoundTakeElderSpiritRule } from '../EndOfRoundTakeElderSpiritRule'

export class EndOfRoundTakeElderSpirit1Rule extends EndOfRoundTakeElderSpiritRule {
  groveToPlaceSpirit = 1
  nextRule = RuleId.EndOfRoundReplaceSpirit1
}
