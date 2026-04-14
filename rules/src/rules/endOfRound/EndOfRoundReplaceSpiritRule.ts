import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritCard, spiritCardData } from '../../material/SpiritCard'
import { CustomMoveType } from '../CustomMoveType'
import { NextRuleHelper } from '../helper/NextRuleHelper'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class EndOfRoundReplaceSpiritRule extends PlayerTurnRule {
  groveToPlaceSpirit?: number
  nextRule?: RuleId

  getPlayerMoves(): MaterialMove<number, number, number, number>[] {
    const moves: MaterialMove[] = []
    this.possibleIndexes().forEach((index) => {
      moves.push(this.customMove(CustomMoveType.ReplaceSpirit, { index }))
    })
    return moves
  }

  onCustomMove(_move: CustomMove, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    const moves: MaterialMove[] = []
    if(isCustomMoveType(CustomMoveType.ReplaceSpirit)(_move)) {
      const arcaneTokensOnCard = this.material(MaterialType.ArcaneToken)
        .location(loc => loc.type === LocationType.ArcaneOnSpiritCardLayout && loc.parent === _move.data.index)
      if (arcaneTokensOnCard.length > 0) {
        moves.push(arcaneTokensOnCard.moveItemsAtOnce({ type: LocationType.ArcaneDiscard }))
      }
      moves.push(this.material(MaterialType.SpiritCard).index(_move.data.index).deleteItem(1))
      const nextRules = this.remind<RuleId[]>(Memory.NextRules) ?? []
      if(nextRules.length > 0) {
        this.memorize(Memory.NextRules, [...nextRules, this.nextRule!])
        moves.push(...new NextRuleHelper(this.game).nextRule())
      } else {
        moves.push(this.startRule(this.nextRule!))
      }
    }
    return moves
  }

  possibleIndexes(): number[] {
    const indexes: number[] = []
    const spiritCardsUnderGroveIndexes = this.material(MaterialType.SpiritCard).location(loc => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === this.groveToPlaceSpirit).player(this.player).getIndexes()
    spiritCardsUnderGroveIndexes.forEach((index) => {
      const card = this.material(MaterialType.SpiritCard).getItem(index)
      const type = spiritCardData[card.id.front as SpiritCard].type
      if(type !== 'elder') {
        indexes.push(index)
      }
    })
    return indexes
  }

}
