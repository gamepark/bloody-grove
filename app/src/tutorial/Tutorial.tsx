/** @jsxImportSource @emotion/react */
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { SpiritCard, SpiritCardId } from '@gamepark/bloody-grove/material/SpiritCard'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/bloody-grove/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'
import { components } from './components.tsx'

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1
  options = { players: [{ id: PlayerColor.Black }, { id: PlayerColor.Green }] }
  setup = new TutorialSetup()

  players = [
    { id: PlayerColor.Black },
    {
      id: PlayerColor.Green,
      name: 'Sylvara',
      avatar: {
        topType: 'LongHairStraightStrand',
        accessoriesType: 'Blank',
        hairColor: 'SilverGray',
        facialHairType: 'Blank',
        clotheType: 'Overall',
        clotheColor: 'PastelGreen',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Light'
      }
    }
  ]

  steps: TutorialStep[] = [
    // ─── INTRODUCTION ───────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.welcome" />
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.goal" components={components} />,
        position: { x: 10, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard)]
      })
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.hand" />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black),
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(PlayerColor.Black)
        ]
      })
    },

    // ─── SHOW ARCANE ────────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.show-arcane" />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) &&
          move.location.type === LocationType.ArcaneShowLayout &&
          move.location.player === PlayerColor.Black &&
          move.itemIndex === 0
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.show-arcane-value" components={components} />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(PlayerColor.Black)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneReserve && move.location.player === PlayerColor.Black
      }
    },

    // ─── AI SHOW ARCANE ──────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.ai-show-arcane" />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)]
      })
    },
    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneShowLayout && move.location.player === PlayerColor.Green
      }
    },
    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) && move.location.type === LocationType.ArcaneReserve && move.location.player === PlayerColor.Green
      }
    },

    // ─── TOUR 1 : PLACE BEARBASE1 SOUS GROVEBEAR ────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.turn1" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location(LocationType.PlayerHand)
            .player(PlayerColor.Black)
            .id<SpiritCardId>((id) => id.front === SpiritCard.BearBase1),
          this.material(game, MaterialType.GroveCard).id((id) => id === 1)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 0) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.BearBase1
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.turn1-result" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerSpiritUnderGroveLayout).player(PlayerColor.Black)]
      })
    },
    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 0) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.BearBase3
        }
      }
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 1) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.FoxBase3
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.ruse-explain" components={components} />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === 1)
            .player(PlayerColor.Green)
        ]
      })
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },

    // ─── TOUR 3 : DRUIDE + INCANTATIONS ─────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid-intro" />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location(LocationType.PlayerHand)
            .player(PlayerColor.Black)
            .id<SpiritCardId>((id) => id.front === SpiritCard.FoxBase3),
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(PlayerColor.Black)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritNearDruidLayout) return false
          if (move.location.id !== 0) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.FoxBase3
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid-symbol" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(PlayerColor.Black),
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerSpiritNearDruidLayout).player(PlayerColor.Black)
        ]
      })
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid-incantation-1" components={components} />,
        position: { x: 0, y: 13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.FoxEliteCard)]
      })
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid-incantation-2" components={components} />,
        position: { x: 0, y: 13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.FoxEliteCard)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) && move.location.type === LocationType.PlayerHand && move.location.player === PlayerColor.Black
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid-transformation" components={components} />,
        position: { x: 0, y: -15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(PlayerColor.Black)]
      })
    },

    // ─── TOUR 5 : OWLBASE1 + JETON ARCANE ───────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.arcane-intro" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location(LocationType.PlayerHand)
            .player(PlayerColor.Black)
            .id<SpiritCardId>((id) => id.front === SpiritCard.OwlBase1),
          this.material(game, MaterialType.GroveCard).id((id) => id === 3)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 2) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.OwlBase1
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.arcane-place" />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneReserve),
          this.material(game, MaterialType.SpiritCard)
            .location(LocationType.PlayerSpiritUnderGroveLayout)
            .id<SpiritCardId>((id) => id.front === SpiritCard.OwlBase1)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.ArcaneToken)(move)) return false
          if (move.location.type !== LocationType.ArcaneOnSpiritCardLayout) return false
          if (move.itemIndex !== 0) return false
          const owlIndex = new BloodyGroveRules(game)
            .material(MaterialType.SpiritCard)
            .location(LocationType.PlayerSpiritUnderGroveLayout)
            .id<SpiritCardId>((id) => id.front === SpiritCard.OwlBase1)
            .getIndex()
          return move.location.parent === owlIndex
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.arcane-hidden" components={components} />,
        position: { x: 0, y: 15 }
      }
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 2) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.OwlBase2
        }
      }
    },

    // ─── FIN DE MANCHE ───────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.end-round" />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) && move.location.type === LocationType.PlayerDeck && move.location.player === PlayerColor.Black
      }
    },

    {
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) && move.location.type === LocationType.PlayerDeck && move.location.player === PlayerColor.Black
      }
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) && move.location.type === LocationType.PlayerDeck && move.location.player === PlayerColor.Green
      }
    },

    // ─── RÉSOLUTION ─────────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.resolve-grove0" />,
        position: { x: 0, y: 18 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard).id((id) => id === 1)]
      })
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.take-elder-0" />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsRiver)]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 0 || move.location.player !== PlayerColor.Black) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.ElderSpirit9
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.replace-spirit" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === 0)
            .player(PlayerColor.Black)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isCustomMoveType(CustomMoveType.ReplaceSpirit)(move)) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.data.index)
          return card?.id?.front === SpiritCard.BearBase1
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.resolve-grove1" />,
        position: { x: 0, y: 18 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard).id((id) => id === 2)]
      })
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 1 || move.location.player !== PlayerColor.Green) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.ElderSpirit3
        }
      }
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.ReplaceSpirit)(move)
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.arcane-reveal" />,
        position: { x: 0, y: 18 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard).id((id) => id === 3), this.material(game, MaterialType.ArcaneToken)]
      })
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.take-elder-2" />,
        position: { x: 0, y: 15 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.ElderSpiritCardsRiver)]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.SpiritCard)(move)) return false
          if (move.location.type !== LocationType.PlayerSpiritUnderGroveLayout) return false
          if (move.location.id !== 2 || move.location.player !== PlayerColor.Black) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.itemIndex)
          return card?.id?.front === SpiritCard.ElderSpiritRed1
        }
      }
    },

    {
      popup: {
        text: () => <Trans i18nKey="tuto.replace-spirit" components={components} />,
        position: { x: 0, y: -13 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard)
            .location((loc) => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === 2)
            .player(PlayerColor.Black)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isCustomMoveType(CustomMoveType.ReplaceSpirit)(move)) return false
          const card = new BloodyGroveRules(game).material(MaterialType.SpiritCard).getItem<SpiritCardId>(move.data.index)
          return card?.id?.front === SpiritCard.OwlBase1
        }
      }
    },

    // ─── CONCLUSION ──────────────────────────────────────────────────────────

    {
      popup: {
        text: () => <Trans i18nKey="tuto.conclusion" components={components} />
      }
    }
  ]
}
