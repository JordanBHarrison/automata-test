import { createContext, useEffect, useState, ReactNode } from 'react';

export enum CardValues {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
  LIZARD = 'lizard',
  SPOCK = 'spock',
}

interface GameState {
  playerScore: number;
  cpuScore: number;
  playerCurrentChoice: CardValues | null;
  cpuCurrentChoice: CardValues | null;
  longestWinningStreak: number;
  isRoundEnded: boolean;
  historicalResults: {
    playerChoice: CardValues;
    cpuChoice: CardValues;
    won: boolean;
  }[];
}

interface GameStateContextType {
  gameState: GameState;
  setPlayerChoice: (choice: CardValues) => void;
  setCpuChoice: (choice: CardValues) => void;
  resetCurrentChoices: () => void;
  setLongestWinningStreak: (streak: number) => void;
  setIsRoundEnded: (isEnded: boolean) => void;
  resetScore: () => void;
  resetGameState: () => void;
}

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

const defaultGameState: GameState = {
  playerScore: 0,
  cpuScore: 0,
  playerCurrentChoice: null,
  cpuCurrentChoice: null,
  longestWinningStreak: 0,
  isRoundEnded: false,
  historicalResults: [],
};

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : defaultGameState;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const resetGameState = () => setGameState(defaultGameState);

  const setPlayerChoice = (choice: CardValues) => setGameState((prevState) => ({ ...prevState, playerCurrentChoice: choice }));

  const setCpuChoice = (choice: CardValues) => setGameState((prevState) => ({ ...prevState, cpuCurrentChoice: choice }));

  const resetCurrentChoices = () => setGameState((prevState) => ({ ...prevState, playerCurrentChoice: null, cpuCurrentChoice: null }));

  const setLongestWinningStreak = (streak: number) => setGameState((prevState) => ({ ...prevState, longestWinningStreak: streak }));

  const setIsRoundEnded = (isEnded: boolean) => setGameState((prevState) => ({ ...prevState, isRoundEnded: isEnded }));

  const resetScore = () => setGameState((prevState) => ({ ...prevState, playerScore: 0, cpuScore: 0 }));

  const addHistoricalResult = (playerChoice: CardValues, cpuChoice: CardValues, won: boolean ) => {
    const newHistoricalResults = [...gameState.historicalResults]
    newHistoricalResults.push({ playerChoice, cpuChoice, won });
    setGameState((prevState) => ({
      ...prevState,
      historicalResults: newHistoricalResults.slice(-10),
    }));
  }

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setPlayerChoice,
        setCpuChoice,
        resetCurrentChoices,
        setLongestWinningStreak,
        setIsRoundEnded,
        resetScore,
        resetGameState
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

