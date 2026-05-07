import { Location, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { ArcaneToken, getArcaneTokenValue } from '../../material/ArcaneToken'
import { getGroveType } from '../../material/GroveCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { spiritCardData, SpiritCardId } from '../../material/SpiritCard'
import { PlayerColor } from '../../PlayerColor'
import { Memory } from '../Memory'
import { DruidTransformationHelper } from './DruidTransformationHelper'

export class GroveHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPossiblePlace(): Location {
    const actualTurn = this.remind<number>(Memory.ActualTurn)
    const actualGroveIndex = this.getActualGroveIndex(actualTurn)
    const x = this.material(MaterialType.SpiritCard).location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === actualGroveIndex).player(this.player).length
    return {
      type: LocationType.PlayerSpiritUnderGroveLayout,
      player: this.player,
      id: actualGroveIndex,
      x
    }
  }

  getPossiblePlacesForMove(indexToSkip: number): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < 3; i++) {
      if (i !== indexToSkip) {
        const x = this.material(MaterialType.SpiritCard).location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === i).player(this.player).length
        locations.push({
          type: LocationType.PlayerSpiritUnderGroveLayout,
          player: this.player,
          id: i,
          x
        })
      }
    }
    return locations
  }

  calculatePlayerForceForGrove(player: PlayerColor, groveIndex: number): number {
    if (groveIndex === undefined) return 0
    let force = 0
    const grove = this.material(MaterialType.GroveCard).getItem(groveIndex)

    const cardsUnderGrove = this.material(MaterialType.SpiritCard)
      .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === groveIndex)
      .player(player)
      .getIndexes()

    const druidType = new DruidTransformationHelper(this.game).getDruidTransformation(player)
    const groveType = getGroveType(grove.id)

    cardsUnderGrove.forEach((cardIdx) => {
      const card = this.material(MaterialType.SpiritCard).getItem(cardIdx)
      const cardFront = (card.id as SpiritCardId)?.front
      if (cardFront) {
        const cardDataEntry = Object.entries(spiritCardData).find(([key]) => parseInt(key) === cardFront)
        if (cardDataEntry) {
          const otherPlayerCardsInGrove = this.material(MaterialType.SpiritCard)
            .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === groveIndex)
            .player(player)
            .getItems()
          force += cardDataEntry[1].force(otherPlayerCardsInGrove) ?? 0
        }

        // Add arcane token bonus
        const arcaneTokens = this.material(MaterialType.ArcaneToken).location(LocationType.ArcaneOnSpiritCardLayout).parent(cardIdx).getItems()

        arcaneTokens.forEach((token) => {
          if (typeof token.id === 'number') {
            force += getArcaneTokenValue(token.id as ArcaneToken)
          }
        })

        const spiritCardType = spiritCardData[cardFront].type

        // Add transformation bonus
        if (spiritCardType === druidType) {
          force += 1
        }

        // Add grove type bonus
        if (spiritCardType === groveType) {
          force += 1
        }
      }
    })
    return force
  }

  getActualGroveIndex(actualTurn: number) {
    switch (actualTurn) {
      case 1:
      case 2:
        return 0
      case 3:
      case 4:
        return 1
      case 5:
      case 6:
      default:
        return 2
    }
  }
}
