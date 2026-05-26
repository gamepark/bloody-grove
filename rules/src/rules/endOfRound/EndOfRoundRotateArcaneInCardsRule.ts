import { isMoveItem, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ArcaneToken } from '../../material/ArcaneToken'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class EndOfRoundRotateArcaneInCardsRule extends MaterialRulesPart {
  actualGroveIndex?: number
  nextRule?: RuleId

  onRuleStart(): MaterialMove[] {
    const rotateArcanesInSpiritCards = this.rotateArcanesInSpiritCardsForThisGrove()
    if (rotateArcanesInSpiritCards.length > 0) {
      return rotateArcanesInSpiritCards
    }
    return [this.startRule(this.nextRule!)]
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItem(move) && move.location.type === LocationType.ArcaneOnSpiritCardLayout) {
      const arcaneId: ArcaneToken = this.material(MaterialType.ArcaneToken).getItem(move.itemIndex).id
      if (arcaneId === ArcaneToken.ArcaneTokenDiscard) {
        const spiritCard = this.material(MaterialType.SpiritCard).index(move.location.parent!)
        const arcanesInCard = this.material(MaterialType.ArcaneToken)
          .location(LocationType.ArcaneOnSpiritCardLayout)
          .rotation(true)
          .parent(move.location.parent!)
        moves.push(arcanesInCard.moveItemsAtOnce({ type: LocationType.ArcaneDiscard }))
        moves.push(spiritCard.deleteItem(1))
      }
    }
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItem(move)) return []
    if (move.location.type === LocationType.ArcaneOnSpiritCardLayout) {
      const parentIndex = move.location.parent!
      if (this.material(MaterialType.SpiritCard).index(parentIndex).getItems().length === 0) {
        const moves: MaterialMove[] = [this.material(MaterialType.ArcaneToken).index(move.itemIndex).moveItem({ type: LocationType.ArcaneDiscard })]
        if (this.rotateArcanesInSpiritCardsForThisGrove().length === 0) moves.push(this.startRule(this.nextRule!))
        return moves
      }
    }
    if (move.location.type === LocationType.ArcaneOnSpiritCardLayout || move.location.type === LocationType.ArcaneDiscard) {
      if (this.rotateArcanesInSpiritCardsForThisGrove().length === 0) return [this.startRule(this.nextRule!)]
    }
    return []
  }

  rotateArcanesInSpiritCardsForThisGrove(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const spiritCards = this.material(MaterialType.SpiritCard)
      .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === this.actualGroveIndex)
      .getIndexes()
    spiritCards.forEach((idx) => {
      const arcanesInCard = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneOnSpiritCardLayout).rotation(true).parent(idx)
      if (arcanesInCard.getItems().some(item => item.id === ArcaneToken.ArcaneTokenDiscard)) {
        moves.push(...arcanesInCard.moveItems({ type: LocationType.ArcaneDiscard }))
        moves.push(this.material(MaterialType.SpiritCard).index(idx).deleteItem(1))
      } else {
        moves.push(...arcanesInCard.rotateItems(false))
      }
    })
    return moves
  }
}
