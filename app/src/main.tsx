import { BloodyGroveOptionsSpec } from '@gamepark/bloody-grove/BloodyGroveOptions'
import { BloodyGroveRules } from '@gamepark/bloody-grove/BloodyGroveRules'
import { BloodyGroveSetup } from '@gamepark/bloody-grove/BloodyGroveSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="bloody-grove"
      Rules={BloodyGroveRules}
      optionsSpec={BloodyGroveOptionsSpec}
      GameSetup={BloodyGroveSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
