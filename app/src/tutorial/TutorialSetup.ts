import { BloodyGroveOptions } from '@gamepark/bloody-grove/BloodyGroveOptions'
import { BloodyGroveSetup } from '@gamepark/bloody-grove/BloodyGroveSetup'
import { ArcaneToken } from '@gamepark/bloody-grove/material/ArcaneToken'
import { GroveCard } from '@gamepark/bloody-grove/material/GroveCard'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import {
  bearEliteCards,
  elderSpiritCards,
  elderSpiritRedCards,
  foxEliteCards,
  owlEliteCards,
  SpiritCard,
  SpiritType
} from '@gamepark/bloody-grove/material/SpiritCard'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'

export class TutorialSetup extends BloodyGroveSetup {
  setupMaterial(_options: BloodyGroveOptions) {
    this.setupTutorialPlayers()
    this.setupTutorialGroves()
    this.setupSpiritCards(foxEliteCards, SpiritType.Fox, LocationType.FoxEliteCardsDeck, LocationType.FoxEliteCard)
    this.setupSpiritCards(bearEliteCards, SpiritType.Bear, LocationType.BearEliteCardsDeck, LocationType.BearEliteCard)
    this.setupSpiritCards(owlEliteCards, SpiritType.Owl, LocationType.OwlEliteCardsDeck, LocationType.OwlEliteCard)
    this.setupTutorialArcaneTokens()
    this.setupTutorialElderSpirits()
    this.setupRoundCard()
  }

  setupTutorialPlayers() {
    // Player Black (human) - Druid
    this.material(MaterialType.SpiritCard).createItem({
      id: { front: SpiritCard.DruidBlack },
      location: { type: LocationType.PlayerDruid, player: PlayerColor.Black }
    })
    // Hand: BearBase1 (force 3, type ours), OwlBase1 (arcane slot), FoxBase3 (ruse), BearBase2
    ;[SpiritCard.BearBase1, SpiritCard.OwlBase1, SpiritCard.FoxBase3, SpiritCard.BearBase2].forEach(front => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front, back: PlayerColor.Black * 100 + SpiritType.Base },
        location: { type: LocationType.PlayerHand, player: PlayerColor.Black }
      })
    })
    // Deck: remaining base cards
    ;[SpiritCard.BearBase3, SpiritCard.FoxBase1, SpiritCard.FoxBase2, SpiritCard.OwlBase2, SpiritCard.OwlBase3].forEach((front, x) => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front, back: PlayerColor.Black * 100 + SpiritType.Base },
        location: { type: LocationType.PlayerDeck, player: PlayerColor.Black, x }
      })
    })

    // Player Green (AI) - cards with 0 arcanes and 0 ruses to avoid sub-rules
    this.material(MaterialType.SpiritCard).createItem({
      id: { front: SpiritCard.DruidGreen },
      location: { type: LocationType.PlayerDruid, player: PlayerColor.Green }
    })
    ;[SpiritCard.FoxBase1, SpiritCard.OwlBase2, SpiritCard.BearBase3, SpiritCard.FoxBase3].forEach(front => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front, back: PlayerColor.Green * 100 + SpiritType.Base },
        location: { type: LocationType.PlayerHand, player: PlayerColor.Green }
      })
    })
    ;[SpiritCard.BearBase1, SpiritCard.BearBase2, SpiritCard.FoxBase2, SpiritCard.OwlBase1, SpiritCard.OwlBase3].forEach((front, x) => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front, back: PlayerColor.Green * 100 + SpiritType.Base },
        location: { type: LocationType.PlayerDeck, player: PlayerColor.Green, x }
      })
    })
  }

  setupTutorialGroves() {
    // Fixed order: Bear(0), Fox(1), Owl(2)
    ;[GroveCard.GroveBear, GroveCard.GroveFox, GroveCard.GroveOwl].forEach((id, index) => {
      this.material(MaterialType.GroveCard).createItem({
        id,
        location: { type: LocationType.GrovesRiver }
      })
      this.material(MaterialType.Cube).createItem({
        location: { type: LocationType.GroveMajority, id: 0, parent: index }
      })
    })
  }

  setupTutorialArcaneTokens() {
    // ArcaneToken4 first (index 0) — player will reveal this one
    // ArcaneToken2 second (index 1) — AI will reveal this
    const ordered: ArcaneToken[] = [
      ArcaneToken.ArcaneToken4, ArcaneToken.ArcaneToken2,
      ArcaneToken.ArcaneToken3, ArcaneToken.ArcaneTokenDiscard,
      ArcaneToken.ArcaneToken4, ArcaneToken.ArcaneToken2,
      ArcaneToken.ArcaneToken3, ArcaneToken.ArcaneTokenDiscard,
      ArcaneToken.ArcaneToken4, ArcaneToken.ArcaneToken2,
      ArcaneToken.ArcaneToken3, ArcaneToken.ArcaneTokenDiscard,
    ]
    ordered.forEach(id => {
      this.material(MaterialType.ArcaneToken).createItem({
        id,
        location: { type: LocationType.ArcaneReserve }
      })
    })
  }

  setupTutorialElderSpirits() {
    // River: 3 elders without triggered effects, one per grove
    // ElderSpirit9: force 2, domination 1, no effects — grove 0 (Black)
    // ElderSpirit3: force = nb elders in same grove, domination 1, no effects — grove 1 (Green)
    // ElderSpiritRed1: domination = nb unique card types in grove, no effects — grove 2 (Black)
    const riverElderCards = [SpiritCard.ElderSpirit9, SpiritCard.ElderSpirit3]
    riverElderCards.forEach(id => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front: id, back: SpiritType.Elder },
        location: { type: LocationType.ElderSpiritCardsRiver }
      })
    })
    this.material(MaterialType.SpiritCard).createItem({
      id: { front: SpiritCard.ElderSpiritRed1, back: SpiritType.ElderRed },
      location: { type: LocationType.ElderSpiritCardsRiver }
    })
    // Deck: remaining elders
    const riverSet = new Set([...riverElderCards, SpiritCard.ElderSpiritRed1 as SpiritCard])
    const deckElders = elderSpiritCards.filter(id => !riverSet.has(id))
    deckElders.forEach((id, x) => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front: id, back: SpiritType.Elder },
        location: { type: LocationType.ElderSpiritCardsDeck, x }
      })
    })
    const deckRedElders = elderSpiritRedCards.filter(id => !riverSet.has(id))
    deckRedElders.forEach((id, x) => {
      this.material(MaterialType.SpiritCard).createItem({
        id: { front: id, back: SpiritType.ElderRed },
        location: { type: LocationType.ElderSpiritCardsDeck, x: deckElders.length + x }
      })
    })
  }
}
