import { useContext } from 'react';
import { GameStateContext } from '../context/game-state-context';

export default () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};