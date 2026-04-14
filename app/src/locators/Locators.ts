import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { arcaneDiscardLocator } from './ArcaneDiscardLocator.ts'
import { arcaneOnSpiritCardLayoutLocator } from './ArcaneOnSpiritCardLayoutLocator.ts'
import { arcaneReserveLocator } from './ArcaneReserveLocator'
import { arcaneShowLayoutLocator } from './ArcaneShowLayoutLocator.ts'
import { bearEliteCardLocator } from './BearEliteCardLocator'
import { bearEliteCardsDeckLocator } from './BearEliteCardsDeckLocator'
import { elderSpiritCardsDeckLocator } from './ElderSpiritCardsDeckLocator'
import { elderSpiritCardsRiverLocator } from './ElderSpiritCardsRiverLocator'
import { foxEliteCardLocator } from './FoxEliteCardLocator'
import { foxEliteCardsDeckLocator } from './FoxEliteCardsDeckLocator'
import { groveMajorityLocator } from './GroveMajorityLocator.ts'
import { grovesRiverLocator } from './GrovesRiverLocator'
import { owlEliteCardLocator } from './OwlEliteCardLocator'
import { owlEliteCardsDeckLocator } from './OwlEliteCardsDeckLocator'
import { playerDeckLocator } from './PlayerDeckLocator'
import { playerDruidLocator } from './PlayerDruidLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerSpiritNearDruidLayoutLocator } from './PlayerSpiritNearDruidLayoutLocator.ts'
import { playerSpiritUnderGroveLayoutLocator } from './PlayerSpiritUnderGroveLayoutLocator.ts'
import { roundCardLocator } from './RoundCardLocator'
import { roundPisteLocator } from './RoundPisteLocator.ts'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.PlayerDeck]: playerDeckLocator,
  [LocationType.PlayerDruid]: playerDruidLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.GrovesRiver]: grovesRiverLocator,
  [LocationType.FoxEliteCardsDeck]: foxEliteCardsDeckLocator,
  [LocationType.FoxEliteCard]: foxEliteCardLocator,
  [LocationType.BearEliteCardsDeck]: bearEliteCardsDeckLocator,
  [LocationType.BearEliteCard]: bearEliteCardLocator,
  [LocationType.OwlEliteCardsDeck]: owlEliteCardsDeckLocator,
  [LocationType.OwlEliteCard]: owlEliteCardLocator,
  [LocationType.ArcaneReserve]: arcaneReserveLocator,
  [LocationType.ElderSpiritCardsDeck]: elderSpiritCardsDeckLocator,
  [LocationType.ElderSpiritCardsRiver]: elderSpiritCardsRiverLocator,
  [LocationType.RoundCard]: roundCardLocator,
  [LocationType.RoundPiste]: roundPisteLocator,
  [LocationType.GroveMajority]: groveMajorityLocator,
  [LocationType.ArcaneShowLayout]: arcaneShowLayoutLocator,
  [LocationType.PlayerSpiritUnderGroveLayout]: playerSpiritUnderGroveLayoutLocator,
  [LocationType.PlayerSpiritNearDruidLayout]: playerSpiritNearDruidLayoutLocator,
  [LocationType.ArcaneOnSpiritCardLayout]: arcaneOnSpiritCardLayoutLocator,
  [LocationType.ArcaneDiscard]: arcaneDiscardLocator
}
