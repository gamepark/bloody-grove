import { MaterialGameSetup } from '@gamepark/rules-api'
import { BloodyGroveOptions } from './BloodyGroveOptions'
import { BloodyGroveRules } from './BloodyGroveRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class BloodyGroveSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BloodyGroveOptions> {
  Rules = BloodyGroveRules

  setupMaterial(_options: BloodyGroveOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
