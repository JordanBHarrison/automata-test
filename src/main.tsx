import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.tsx'
import { GameStateProvider } from './context/game-state-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </StrictMode>,
)
