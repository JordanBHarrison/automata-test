import { createContext, useEffect, useState, ReactNode } from 'react';

export enum CardValues {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
  LIZARD = 'lizard',
  SPOCK = 'spock',
}

type RoundWinner = 'player' | 'cpu' | 'draw';

interface GameState {
  playerUsername: string | null;
  playerScore: number;
  cpuScore: number;
  draws: number;
  playerCurrentChoice: CardValues | null;
  cpuCurrentChoice: CardValues | null;
  currentRoundWinner: RoundWinner | null;
  currentStreak: number;
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
  setPlayerUsername: (username: string) => void;
  setPlayerChoice: (choice: CardValues) => void;
  setCpuChoice: (choice: CardValues) => void;
  setCurrentSteak: (streak: number) => void;
  setLongestWinningStreak: (streak: number) => void;
  setIsRoundEnded: (isEnded: boolean) => void;
  setRoundWinner: (winner: RoundWinner) => void;
  startNextRound: () => void;
  resetScore: () => void;
  resetGameState: () => void;
  incrementCpuScore: () => void;
  incrementPlayerScore: () => void;
  incrementDraws: () => void;
  addHistoricalResult: (playerChoice: CardValues, cpuChoice: CardValues, won: boolean) => void;
}

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

const defaultGameState: GameState = {
  playerUsername: null,
  playerScore: 0,
  cpuScore: 0,
  draws: 0,
  playerCurrentChoice: null,
  cpuCurrentChoice: null,
  currentRoundWinner: null,
  currentStreak: 0,
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

  const resetGameState = () => {
    localStorage.removeItem('gameState');
    setGameState(defaultGameState);
  }

  const setPlayerUsername = (username: string) => setGameState((prevState) => ({ ...prevState, playerUsername: username }));

  const setPlayerChoice = (choice: CardValues) => setGameState((prevState) => ({ ...prevState, playerCurrentChoice: choice }));

  const setCpuChoice = (choice: CardValues) => setGameState((prevState) => ({ ...prevState, cpuCurrentChoice: choice }));

  const resetCurrentChoices = () => setGameState((prevState) => ({ ...prevState, playerCurrentChoice: null, cpuCurrentChoice: null }));

  const setCurrentSteak = (streak: number) => {
    setGameState((prevState) => ({ ...prevState, currentStreak: streak }));
    if (streak > gameState.longestWinningStreak) setLongestWinningStreak(streak);
  }

  const setLongestWinningStreak = (streak: number) => setGameState((prevState) => ({ ...prevState, longestWinningStreak: streak }));

  const setIsRoundEnded = (isEnded: boolean) => setGameState((prevState) => ({ ...prevState, isRoundEnded: isEnded }));

  const setRoundWinner = (winner: RoundWinner) => setGameState((prevState) => ({ ...prevState, currentRoundWinner: winner }));
  const clearRoundWinner = () => setGameState((prevState) => ({ ...prevState, currentRoundWinner: null }));

  const startNextRound = () => {
    // Add result to historical results
    clearRoundWinner();
    resetCurrentChoices();
    setIsRoundEnded(false);
  }

  const resetScore = () => setGameState((prevState) => ({ ...prevState, playerScore: 0, cpuScore: 0, draws: 0 }));

  const addHistoricalResult = (playerChoice: CardValues, cpuChoice: CardValues, won: boolean ) => {
    const newHistoricalResults = [...gameState.historicalResults]
    newHistoricalResults.push({ playerChoice, cpuChoice, won });
    setGameState((prevState) => ({
      ...prevState,
      historicalResults: newHistoricalResults.slice(-10),
    }));
  }

  const incrementCpuScore = () => setGameState((prevState) => ({ ...prevState, cpuScore: prevState.cpuScore + 1 }));
  const incrementPlayerScore = () => setGameState((prevState) => ({ ...prevState, playerScore: prevState.playerScore + 1 }));
  const incrementDraws = () => setGameState((prevState) => ({ ...prevState, draws: prevState.draws + 1 }));

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setPlayerUsername,
        setPlayerChoice,
        setCpuChoice,
        setCurrentSteak,
        setLongestWinningStreak,
        setRoundWinner,
        setIsRoundEnded,
        startNextRound,
        resetScore,
        resetGameState,
        incrementCpuScore,
        incrementPlayerScore,
        incrementDraws,
        addHistoricalResult,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

