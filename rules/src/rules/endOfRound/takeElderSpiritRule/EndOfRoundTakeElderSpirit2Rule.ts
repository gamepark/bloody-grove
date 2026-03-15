import { RuleId } from '../../RuleId'
import { EndOfRoundTakeElderSpiritRule } from '../EndOfRoundTakeElderSpiritRule'

export class EndOfRoundTakeElderSpirit2Rule extends EndOfRoundTakeElderSpiritRule {
  groveToPlaceSpirit = 2
  nextRule = RuleId.PrepareNextRound
}
