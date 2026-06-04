import { isMoveItem, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ArcaneToken } from '../../material/ArcaneToken'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class EndOfRoundRotateArcaneInCardsRule extends MaterialRulesPart {
  actualGroveIndex?: number
  nextRule?: RuleId

  onRuleStart(): MaterialMove[] {
    // nextRule (which grove to resolve) is static and does not depend on the rotation
    // consequences, so we queue it at the very end of the batch. The engine plays each
    // move and unshifts its consequences to the front of the queue, so every rotation,
    // arcane discard and spirit card deletion (and their consequences) is applied before
    // the startRule is reached. The resolution therefore always sees the final state.
    return [...this.rotateArcanesInSpiritCardsForThisGrove(), this.startRule(this.nextRule!)]
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

  rotateArcanesInSpiritCardsForThisGrove(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const spiritCards = this.material(MaterialType.SpiritCard)
      .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === this.actualGroveIndex)
      .getIndexes()
    spiritCards.forEach((idx) => {
      const arcanesInCard = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneOnSpiritCardLayout).rotation(true).parent(idx)
      if (arcanesInCard.getItems().some(item => item.id === ArcaneToken.ArcaneTokenDiscard)) {
        // Discard the whole spirit card: send its arcane tokens to the discard and remove the card.
        moves.push(...arcanesInCard.moveItems({ type: LocationType.ArcaneDiscard }))
        moves.push(this.material(MaterialType.SpiritCard).index(idx).deleteItem(1))
      } else {
        moves.push(...arcanesInCard.rotateItems(false))
      }
    })
    return moves
  }
}
