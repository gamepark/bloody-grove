import {
  FillGapStrategy,
  hideFront, hideFrontToOthers,
  hideItemId,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { TheFirstStepRule } from './rules/TheFirstStepRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class BloodyGroveRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.SpiritCard]: {
      [LocationType.BearEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.FoxEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.OwlEliteCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.ElderSpiritCard]: {
      [LocationType.ElderSpiritCardsDeck]: new PositiveSequenceStrategy(),
      [LocationType.ElderSpiritCardsRiver]: new FillGapStrategy()
    },
    [MaterialType.GroveCard]: {
      [LocationType.GrovesRiver]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpiritCard]: {
      [LocationType.BearEliteCardsDeck]: hideFront,
      [LocationType.FoxEliteCardsDeck]: hideFront,
      [LocationType.OwlEliteCardsDeck]: hideFront,
      [LocationType.PlayerDeck]: hideFront,
      [LocationType.PlayerHand]: hideFrontToOthers,
    },
    [MaterialType.ElderSpiritCard]: {
      [LocationType.ElderSpiritCardsDeck]: hideFront
    },
    [MaterialType.ArcaneToken]: {
      [LocationType.ArcaneReserve]: hideItemId
    }
  }

  giveTime(): number {
    return 60
  }
}
