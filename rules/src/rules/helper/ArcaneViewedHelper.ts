import { MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerColor } from '../../PlayerColor'
import { Memory } from '../Memory'

/**
 * Tracks, for each player, the indexes of the Arcane tokens they have secretly looked at.
 *
 * An index is added when a player consults a token, and removed for everyone once the token is
 * revealed to all (rotated face-up on a Spirit card or sent to the discard). Only the index is
 * stored, never the value, so this never leaks the token's worth to the opponent.
 */
export class ArcaneViewedHelper extends MaterialRulesPart {
  getViewed(player: PlayerColor): number[] {
    return this.remind<number[]>(Memory.ArcaneTokenViewed, player) ?? []
  }

  addViewed(player: PlayerColor, index: number): void {
    const viewed = this.getViewed(player)
    if (!viewed.includes(index)) {
      this.memorize(Memory.ArcaneTokenViewed, [...viewed, index], player)
    }
  }

  forgetForAll(index: number): void {
    for (const player of this.game.players) {
      const viewed = this.getViewed(player)
      if (viewed.includes(index)) {
        this.memorize(
          Memory.ArcaneTokenViewed,
          viewed.filter((i) => i !== index),
          player
        )
      }
    }
  }
}
