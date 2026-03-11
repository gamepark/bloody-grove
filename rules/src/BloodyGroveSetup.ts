import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit'
import { BloodyGroveOptions } from './BloodyGroveOptions'
import { BloodyGroveRules } from './BloodyGroveRules'
import { arcaneTokens } from './material/ArcaneToken'
import { elderSpiritCards, elderSpiritRedCards, ElderSpiritType } from './material/ElderSpiritCard'
import { groveCards } from './material/GroveCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { baseSpiritCards, bearEliteCards, foxEliteCards, owlEliteCards, SpiritCard, SpiritType } from './material/SpiritCard'
import { PlayerColor } from './PlayerColor'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class BloodyGroveSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BloodyGroveOptions> {
  Rules = BloodyGroveRules

  setupPlayers() {
    this.players.forEach(player => {
      this.material(MaterialType.DruidCard).createItem({ id: player, location: { type: LocationType.PlayerDruid, player }})
      this.material(MaterialType.SpiritCard).createItems(shuffle(baseSpiritCards).map(id => ({ id: {front: id, back: player * 100 + SpiritType.Base}, location: { type: LocationType.PlayerDeck, player } })))
      this.material(MaterialType.SpiritCard).location(LocationType.PlayerDeck).player(player).limit(4).moveItems({ type: LocationType.PlayerHand, player })
    })
  }

  setupSpiritCards(cards: SpiritCard[], type: SpiritType, deckLocation: LocationType, reaveledCardLocation: LocationType) {
    this.material(MaterialType.SpiritCard).createItems(shuffle(cards).map(id => ({ id: {front: id, back: type}, location: { type:  deckLocation} })))
    this.material(MaterialType.SpiritCard).location(deckLocation).limit(1).moveItems({ type: reaveledCardLocation })
  }

  setupElderSpiritCards() {
    this.material(MaterialType.ElderSpiritCard).createItems(shuffle(elderSpiritRedCards).map(id => ({ id: {front: id, back: ElderSpiritType.ElderSpiritRed}, location: { type:  LocationType.ElderSpiritCardsDeck} })))
    this.material(MaterialType.ElderSpiritCard).createItems(shuffle(elderSpiritCards).map(id => ({ id: {front: id, back: ElderSpiritType.ElderSpirit}, location: { type:  LocationType.ElderSpiritCardsDeck} })))
    this.material(MaterialType.ElderSpiritCard).location(LocationType.ElderSpiritCardsDeck).limit(3).moveItems({ type: LocationType.ElderSpiritCardsRiver })
  }

  setupRoundCard() {
    const rotation = this.players[0] !== PlayerColor.Black
    this.material(MaterialType.RoundCard).createItem({ location: { type:  LocationType.RoundCard, rotation} })
    this.material(MaterialType.Cube).createItem({ location: { type:  LocationType.RoundPiste, id: 1} })
  }

  setupGroves() {
    shuffle(groveCards).forEach((id, index) => {
      this.material(MaterialType.GroveCard).createItem({ id, location: { type: LocationType.GrovesRiver } })
      this.material(MaterialType.Cube).createItem({ location: { type:  LocationType.GroveMajority, id: 0, parent: index} })
    })

  }

  setupMaterial(_options: BloodyGroveOptions) {
    this.setupPlayers()
    this.setupGroves()
    this.setupSpiritCards(foxEliteCards, SpiritType.Fox, LocationType.FoxEliteCardsDeck, LocationType.FoxEliteCard)
    this.setupSpiritCards(bearEliteCards, SpiritType.Bear, LocationType.BearEliteCardsDeck, LocationType.BearEliteCard)
    this.setupSpiritCards(owlEliteCards, SpiritType.Owl, LocationType.OwlEliteCardsDeck, LocationType.OwlEliteCard)
    this.material(MaterialType.ArcaneToken).createItems(shuffle(arcaneTokens).map(id => ({ id, location: { type: LocationType.ArcaneReserve } })))
    this.setupElderSpiritCards()
    this.setupRoundCard()
  }

  start() {
    this.memorize(Memory.firstPlayer, this.players[0])
    this.startSimultaneousRule(RuleId.ShowArcaneSimultaneous)
  }
}
