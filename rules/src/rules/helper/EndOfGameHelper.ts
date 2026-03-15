import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritCard, spiritCardData } from '../../material/SpiritCard'
import { PlayerColor } from '../../PlayerColor'


export class EndOfGameHelper extends MaterialRulesPart {

  constructor(game: MaterialGame) {
    super(game)
  }

  onePlayerHaveAllGroves(): boolean {
    const groveMajorities = this.material(MaterialType.Cube).location(LocationType.GroveMajority).getItems().map(item => item.location.id)
    return groveMajorities.every( v => v === groveMajorities[0] )
  }

  getMajority(player: PlayerColor): number {
    return this.material(MaterialType.Cube).location(loc => loc.type === LocationType.GroveMajority && loc.id === player).length
  }

  getScore(player: PlayerColor): number {
    const playerSpiritCardsUnderGroves =  this.material(MaterialType.SpiritCard).location(LocationType.PlayerSpiritUnderGroveLayout).player(player).getItems()
    const druidTransformation = this.material(MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(player).maxBy(item => item.location.x ?? 0).getItem()
    let domination = spiritCardData[druidTransformation?.id.front as SpiritCard].dominations([]) ?? 0
    playerSpiritCardsUnderGroves.forEach((card) => {
      const otherPlayerCardsInGrove = this.material(MaterialType.SpiritCard).location(loc => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === card.location.id).player(player).getItems()
      domination += spiritCardData[card.id.front as SpiritCard].dominations(otherPlayerCardsInGrove) ?? 0
    })
    return domination
  }

  rankPlayers(playerA: PlayerColor, playerB: PlayerColor): number {
    if (this.onePlayerHaveAllGroves()) {
      return this.getMajority(playerB) > this.getMajority(playerA) ? 1 : -1
    }

    return this.getScore(playerB) > this.getScore(playerA) ? 1 : this.getScore(playerB) < this.getScore(playerA) ? -1 : 0
  }

  checkIfWinnerIsDeterminateByScore() {
    return !this.onePlayerHaveAllGroves()
  }

  getPlayerTransformations(player: PlayerColor) {
    const druidTransformations = this.material(MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(player)
    return druidTransformations.length
  }
}
