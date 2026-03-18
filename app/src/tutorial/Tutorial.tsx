/** @jsxImportSource @emotion/react */
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules'
import { LocationType } from '@gamepark/bloody-grove/material/LocationType'
import { MaterialType } from '@gamepark/bloody-grove/material/MaterialType'
import { SpiritCard, SpiritCardId } from '@gamepark/bloody-grove/material/SpiritCard'
import { PlayerColor } from '@gamepark/bloody-grove/PlayerColor'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/bloody-grove/rules/CustomMoveType'
import { RuleId } from '@gamepark/bloody-grove/rules/RuleId'
import { isCustomMoveType, isMoveItemType, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'
import { components } from './components.tsx'

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1
  options = { players: [{ id: PlayerColor.Black }, { id: PlayerColor.Green }] }
  setup = new TutorialSetup()

  players = [
    { id: PlayerColor.Black },
    { id: PlayerColor.Green, name: 'Sylvara',
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
      } }
  ]


  steps: TutorialStep[] = [

    // ─── INTRODUCTION ───────────────────────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.welcome"
            defaults="Bienvenue dans <strong>Bloody Grove</strong> ! Dans ce tutoriel, vous affrontez Sylvara, qui joue le druide vert. Vous jouez le <strong>druide noir</strong>."
          />
        )
      }
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.goal"
            components={components}
            defaults="Votre objectif : <strong>contrôler les 3 Bosquets</strong> à la fin d'une manche pour gagner immédiatement, ou accumuler le plus de points de <strong>Domination (<domination />)</strong> en 4 manches."
          />
        ),
        position: { x: 0, y: 35 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard)]
      })
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.hand"
            defaults="Voici votre <strong>main</strong> (4 cartes Esprit) et votre <strong>Druide</strong>. Chaque manche, vous avez le choix entre 2 actions : Envoyer un esprit combatre dans le bosquet actif <strong>ou</strong> utiliser un esprit pour transformer votre Druide."
          />
        ),
        position: { x: 0, y: -25 }
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
        text: () => (
          <Trans
            i18nKey="tuto.show-arcane"
            defaults="Avant de jouer, chaque joueur peut <strong>consulter secrètement</strong> un jeton Arcane de la réserve. Cliquez sur un jeton pour le regarder !"
          />
        ),
        position: { x: 0, y: 30 }
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
        text: () => (
          <Trans
            i18nKey="tuto.show-arcane-value"
            components={components}
            defaults="Ce jeton vaut <strong>+4<force /></strong> ! Retenez-le précieusement — il sera votre arme secrète. Replacez-le maintenant dans la réserve."
          />
        ),
        position: { x: 0, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneShowLayout).player(PlayerColor.Black)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) &&
          move.location.type === LocationType.ArcaneReserve &&
          move.location.player === PlayerColor.Black
      }
    },

    // ─── AI SHOW ARCANE ──────────────────────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.ai-show-arcane"
            defaults="Sylvara consulte aussi secrètement un jeton Arcane de la réserve..."
          />
        ),
        position: { x: 0, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneReserve)]
      })
    },
    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) &&
          move.location.type === LocationType.ArcaneShowLayout &&
          move.location.player === PlayerColor.Green
      }
    },
    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.ArcaneToken)(move) &&
          move.location.type === LocationType.ArcaneReserve &&
          move.location.player === PlayerColor.Green
      }
    },

    // ─── TOUR 1 : PLACE BEARBASE1 SOUS GROVEBEAR ────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.turn1"
            components={components}
            defaults="C'est à vous ! <strong>Bosquet 1 : l'Ours</strong>. Jouez l'Esprit Ours sous ce Bosquet — les cartes Ours y reçoivent <strong>+1<force /></strong> bonus de type !"
          />
        ),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black).id<SpiritCardId>(id => id.front === SpiritCard.BearBase1),
          this.material(game, MaterialType.GroveCard).id(id => id === 1)
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
        text: () => (
          <Trans
            i18nKey="tuto.turn1-result"
            components={components}
            defaults="Parfait ! Cet esprit a <strong>3<force /></strong>, +1 bonus de type Ours = <strong>4<force /> totale</strong>. Sylvara joue maintenant <strong>deux fois de suite</strong> avant votre prochain tour..."
          />
        ),
        position: { x: 0, y: 35 }
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
          return card?.id?.front === SpiritCard.FoxBase1
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
          return card?.id?.front === SpiritCard.OwlBase2
        }
      }
    },

    // ─── TOUR 3 : DRUIDE + INCANTATIONS ─────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.druid-intro"
            defaults="<strong>Bosquet 2 : le Renard</strong>. Plutôt que d'y jouer directement, utilisez la mécanique du <strong>Druide</strong> ! Placez cet esprit à <strong>gauche</strong> du Druide."
          />
        ),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black).id<SpiritCardId>(id => id.front === SpiritCard.FoxBase3),
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
        text: () => (
          <Trans
            i18nKey="tuto.druid-symbol"
            components={components}
            defaults="En posant cet esprit, vous avez formé un symbole <recrutement /> Renard entre la carte esprit et votre Druide !"
          />
        ),
        position: { x: 0, y: -25 }
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
        text: () => (
          <Trans
            i18nKey="tuto.druid-incantation-1"
            components={components}
            defaults="Chaque symbole recrutement <recrutement /> complets vous permet de récupérer la carte visible du même type. Vous pouvez la mettre <strong>sur le dessus</strong> de votre deck, <strong>sous votre deck</strong> ou <strong>dans votre main</strong>."
          />
        ),
        position: { x: 0, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.FoxEliteCard)]
      })
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.druid-incantation-2"
            components={components}
            defaults="Prenez la <strong>carte Renard Élite</strong> en main."
          />
        ),
        position: { x: 0, y: 25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.FoxEliteCard)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) &&
          move.location.type === LocationType.PlayerHand &&
          move.location.player === PlayerColor.Black
      }
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.druid-transformation"
            components={components}
            defaults="La carte esprit est ensuite posée sur votre Druide : <strong>transformation Renard activée</strong> ! Toutes vos cartes Renard dans les Bosquets gagnent désormais <strong>+1<force /></strong>. À vous de jouer pour le Bosquet Hibou !"
          />
        ),
        position: { x: 0, y: -30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerDruid).player(PlayerColor.Black)]
      })
    },

    // ─── TOUR 5 : OWLBASE1 + JETON ARCANE ───────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.arcane-intro"
            components={components}
            defaults="<strong>Bosquet 3 : le Hibou</strong>. Jouez cet esprit qui possède un <strong>emplacement Arcane (<arcane />)</strong> — vous pourrez placer un jeton secret !"
          />
        ),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black).id<SpiritCardId>(id => id.front === SpiritCard.OwlBase1),
          this.material(game, MaterialType.GroveCard).id(id => id === 3)
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
        text: () => (
          <Trans
            i18nKey="tuto.arcane-place"
            defaults="Un emplacement Arcane est disponible ! <strong>Placez le jeton Arcane face cachée</strong> sur votre Hibou — Sylvara ne connaîtra pas sa valeur !"
          />
        ),
        position: { x: 0, y: 30 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.ArcaneToken).location(LocationType.ArcaneReserve),
          this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerSpiritUnderGroveLayout).id<SpiritCardId>(id => id.front === SpiritCard.OwlBase1)
        ]
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.ArcaneToken)(move)) return false
          if (move.location.type !== LocationType.ArcaneOnSpiritCardLayout) return false
          if (move.itemIndex !== 0) return false
          const owlIndex = new BloodyGroveRules(game).material(MaterialType.SpiritCard)
            .location(LocationType.PlayerSpiritUnderGroveLayout)
            .id<SpiritCardId>(id => id.front === SpiritCard.OwlBase1)
            .getIndex()
          return move.location.parent === owlIndex
        }
      }
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.arcane-hidden"
            components={components}
            defaults="Jeton <strong>posé face cachée</strong> ! Vous savez qu'il vaut +4<force />, mais Sylvara l'ignore. Il se révèlera lors de la résolution."
          />
        ),
        position: { x: 0, y: 30 }
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
          return card?.id?.front === SpiritCard.FoxBase3
        }
      }
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.ruse-explain"
            components={components}
            defaults="Sylvara à joué un esprit avec une ruse <ruse />. Une <strong>Ruse <ruse /></strong> permet de déplacer un Esprit d'un Bosquet à un autre. Sylvara choisit de ne pas l'utiliser cette fois."
          />
        ),
        position: { x: 0, y: 35 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.SpiritCard).location(loc => loc.type === LocationType.PlayerSpiritUnderGroveLayout && loc.id === 2).player(PlayerColor.Green),
        ]
      }),
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },

    // ─── FIN DE MANCHE ───────────────────────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.end-round"
            defaults="La manche se termine ! Vous devez d'abord <strong>défausser les cartes restantes</strong> de votre main <strong>sous votre deck</strong>, dans l'ordre de votre choix."
          />
        ),
        position: { x: 0, y: -25 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.SpiritCard).location(LocationType.PlayerHand).player(PlayerColor.Black)]
      }),
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) &&
          move.location.type === LocationType.PlayerDeck &&
          move.location.player === PlayerColor.Black
      }
    },

    {
      move: {
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) &&
          move.location.type === LocationType.PlayerDeck &&
          move.location.player === PlayerColor.Black
      }
    },

    {
      move: {
        player: PlayerColor.Green,
        filter: (move: MaterialMove) =>
          isMoveItemType(MaterialType.SpiritCard)(move) &&
          move.location.type === LocationType.PlayerDeck &&
          move.location.player === PlayerColor.Green
      }
    },

    // ─── RÉSOLUTION ─────────────────────────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.resolve-grove0"
            defaults="La résolution commence bosquet par bosquet. <strong>Bosquet Ours</strong> : votre esprit ours (Force 3 + 1 type = <strong>4</strong>) bat Sylvara. Vous remportez le Bosquet !"
          />
        ),
        position: { x: 0, y: 35 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard).id(id => id === 1)]
      })
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.take-elder-0"
            defaults="Choisissez un <strong>Esprit Ancien</strong> dans la rivière pour renforcer ce Bosquet la prochaine manche."
          />
        ),
        position: { x: 0, y: 30 }
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
        text: () => (
          <Trans
            i18nKey="tuto.resolve-grove1"
            defaults="<strong>Bosquet Renard</strong> : Sylvara remporte ce Bosquet. Elle choisit un Esprit Ancien..."
          />
        ),
        position: { x: 0, y: 35 }
      },
      focus: (game: MaterialGame) => ({
        materials: [this.material(game, MaterialType.GroveCard).id(id => id === 2)]
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
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.arcane-reveal"
            defaults="<strong>Bosquet Hibou</strong> : le jeton Arcane se révèle ! Esprit hibou (Force 1) + bonus Hibou (+1) + <strong>jeton Arcane (+4) = 6</strong>. Vous remportez ce Bosquet !"
          />
        ),
        position: { x: 0, y: 35 }
      },
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.GroveCard).id(id => id === 3),
          this.material(game, MaterialType.ArcaneToken)
        ]
      })
    },

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.take-elder-2"
            defaults="Choisissez un <strong>Esprit Ancien</strong> pour ce Bosquet."
          />
        ),
        position: { x: 0, y: 30 }
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
        },
        interrupt: (move: MaterialMove) => isStartRule(move) && move.id === RuleId.PrepareNextRound
      }
    },

    // ─── CONCLUSION ──────────────────────────────────────────────────────────

    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.conclusion"
            defaults="<strong>Félicitations !</strong> Vous maîtrisez les bases de Bloody Grove. Continuez à jouer : découvrez les effets des Esprits Anciens, maîtrisez les Ruses pour déplacer vos cartes, et remportez les 3 Bosquets pour la victoire !"
          />
        )
      },
      move: {}
    },
  ]
}
