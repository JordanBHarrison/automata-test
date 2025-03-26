import { useState, useEffect } from 'react';
import { HiddenCard, Card } from '../components/card';
import { CardValues } from '../context/game-state-context';
import UsernamePanel from '../components/username-panel';
import useGameState from '../hooks/useGameState';

const WINNING_COMBOS: Record<CardValues, Record<string, string>> = {
  [CardValues.ROCK]: {
    [CardValues.SCISSORS]: 'breaks',
    [CardValues.LIZARD]: 'crushes',
  },
  [CardValues.PAPER]: {
    [CardValues.ROCK]: 'covers',
    [CardValues.SPOCK]: 'disproves',
  },
  [CardValues.SCISSORS]: {
    [CardValues.PAPER]: 'cut',
    [CardValues.LIZARD]: 'decapitates',
  },
  [CardValues.LIZARD]: {
    [CardValues.SPOCK]: 'poisons',
    [CardValues.PAPER]: 'eats',
  },
  [CardValues.SPOCK]: {
    [CardValues.SCISSORS]: 'smashes',
    [CardValues.ROCK]: 'vaporizes',
  },
}

const Gameboard = () => {
  const {
    gameState,
    setPlayerUsername,
    setPlayerChoice,
    setCpuChoice,
    setCurrentSteak,
    setIsRoundEnded,
    setRoundWinner,
    startNextRound,
    incrementCpuScore,
    incrementPlayerScore,
    incrementDraws,
  } = useGameState();
  const { playerUsername, isRoundEnded, playerCurrentChoice, cpuCurrentChoice, currentRoundWinner, currentStreak } = gameState;

  useEffect(() => {
  if (playerCurrentChoice && !isRoundEnded) makeCpuChoice();
  }, [playerCurrentChoice])

  useEffect(() => {
    if (playerCurrentChoice && cpuCurrentChoice) determineWinner();
  }, [cpuCurrentChoice])

  const makeCpuChoice = () => {
    const choices = Object.values(CardValues);
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    setCpuChoice(randomChoice);
  }

  const determineWinner = () => {
    const playerChoice = playerCurrentChoice!;
    const cpuChoice = cpuCurrentChoice!;
    if (playerChoice === cpuChoice) {
      // Draw
      if (!currentRoundWinner) incrementDraws();
      setRoundWinner('draw');
    } else if (Object.keys(WINNING_COMBOS[playerChoice]).includes(cpuChoice)) {
      // Player wins
      if (!currentRoundWinner) {
        incrementPlayerScore();
        setCurrentSteak(currentStreak + 1);
      }
      setRoundWinner('player');
    } else {
      // CPU wins
      if (!currentRoundWinner) {
        incrementCpuScore();
        setCurrentSteak(0);
      }
      setRoundWinner('cpu');
    }
    setIsRoundEnded(true);
  }

  return (
    <div className='flex flex-col w-full max-w-[800px] mx-auto bg-amber-300 gap-20'>
      {!playerUsername && <NewUserModal setPlayerUsername={setPlayerUsername} />}
      <OpponentArea />
      <MidBoard
        playerChoice={playerCurrentChoice}
        cpuChoice={cpuCurrentChoice}
        isRoundEnded={isRoundEnded}
        startNextRound={startNextRound}
        currentRoundWinner={currentRoundWinner}
      />
      <PlayerArea
        username={gameState.playerUsername}
        setPlayerChoice={choice => setPlayerChoice(choice)}
        isRoundEnded={isRoundEnded}
        currentChoice={playerCurrentChoice}
      />
    </div>
  );
}

const OpponentArea = () => {
  return (
    <section id='opponent' className='flex flex-row items-center justify-center gap-4'>
      <div className='flex flex-row justify-center px-2 gap-3 bg-gray-300 rounded-b-xl overflow-hidden self-start'>
        <HiddenCard className='transform -translate-y-1/3' small />
        <HiddenCard className='transform -translate-y-1/3' small />
        <HiddenCard className='transform -translate-y-1/3' small />
        <HiddenCard className='transform -translate-y-1/3' small />
        <HiddenCard className='transform -translate-y-1/3' small />
      </div>
      <UsernamePanel username='CPU' />
    </section>
  )
}

type MidBoardProps = {
  isRoundEnded: boolean
  playerChoice: CardValues | null
  cpuChoice: CardValues | null
  startNextRound: () => void
  currentRoundWinner: string | null
}

const MidBoard = ({ playerChoice, cpuChoice, isRoundEnded, startNextRound, currentRoundWinner }: MidBoardProps) => {
  let promptCopy
  let verb

  switch (currentRoundWinner) {
    case 'player':
      verb = WINNING_COMBOS[playerChoice!][cpuChoice!];
      promptCopy = `${playerChoice!.toUpperCase()} ${verb} ${cpuChoice!.toUpperCase()}`;
      break;
    case 'cpu':
      verb = WINNING_COMBOS[cpuChoice!][playerChoice!];
      promptCopy = `${cpuChoice!.toUpperCase()} ${verb} ${playerChoice!.toUpperCase()}`;
      break;
    case 'draw':
      promptCopy = 'It\'s a draw';
      break;
    default:
      promptCopy = 'Make your selection';
  }

  const cardPlaceholderStyle = 'aspect-4/5 border-2 border-dashed w-24 rounded-xl'
  return (
    <section id='mid-board' className='relative flex flex-col items-center gap-4'>
      <div className='flex items-center justify-center h-8 min-w-[200px] text-gray-700 bg-white/40 p-2 rounded-xl'>
        <span className='text-sm'>{promptCopy}</span>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        {playerChoice ? <Card value={playerChoice} className={currentRoundWinner === 'player' ? '!border-blue-400' : ''} /> : <div className={cardPlaceholderStyle} />}
        {cpuChoice ? <Card value={cpuChoice} className={currentRoundWinner === 'cpu' ? '!border-blue-400' : ''} /> : <div className={cardPlaceholderStyle} />}
      </div>
      {isRoundEnded && <button className='absolute -bottom-4 transform translate-y-full' onClick={startNextRound}>Next round</button>}
    </section>
  )
}

type PlayerAreaProps = {
  username: string | null
  currentChoice: CardValues | null
  setPlayerChoice: (card: CardValues) => void
  isRoundEnded: boolean
}
const PlayerArea = ({ username, currentChoice, setPlayerChoice, isRoundEnded }: PlayerAreaProps) => {

  const onCardSelect = (value: CardValues) => {
    if (isRoundEnded) return;
    setPlayerChoice(value);
  }

  return (
    <section id='player' className='flex flex-row items-center gap-4'>
      <UsernamePanel username={username || 'Player 1'} className='hidden md:block'/>
      <div className='relative flex flex-row justify-center gap-3 bg-gray-300 w-full max-w-xl p-4 pt-12 rounded-t-xl mx-auto overflow-hidden md:pt-4'>
        <UsernamePanel username={username || 'Player 1'} className='absolute top-2 left-4 shadow-none bg-white/40 md:hidden' compact />
        <Card value={CardValues.ROCK} onClick={onCardSelect} isActive={!isRoundEnded} selected={currentChoice === CardValues.ROCK} />
        <Card value={CardValues.PAPER} onClick={onCardSelect} isActive={!isRoundEnded} selected={currentChoice === CardValues.PAPER} />
        <Card value={CardValues.SCISSORS} onClick={onCardSelect} isActive={!isRoundEnded} selected={currentChoice === CardValues.SCISSORS} />
        <Card value={CardValues.LIZARD} onClick={onCardSelect} isActive={!isRoundEnded} selected={currentChoice === CardValues.LIZARD} />
        <Card value={CardValues.SPOCK} onClick={onCardSelect} isActive={!isRoundEnded} selected={currentChoice === CardValues.SPOCK} />
      </div>
    </section>
  )
}

type NewUserModalProps = {
  setPlayerUsername: (username: string) => void
}
const NewUserModal = ({ setPlayerUsername }: NewUserModalProps) => {
  const [usernameInput, setUsernameInput] = useState('');
  return (
    <div className='fixed inset-0 bg-black/20 bg-opacity-50 flex flex-col justify-center items-center z-10'>
      <div className='flex flex-col gap-4 bg-white text-gray-700 p-4 rounded-xl'>
        <h2 className='text-xl'>Welcome to the game!</h2>
        <p className='text-sm'>Please enter your username to start playing</p>
        <input type='text' onChange={e => setUsernameInput(e.target.value)} placeholder='Username' value={usernameInput} className='border-2 border-gray-300 rounded-lg p-1' />
        <button className='text-gray-300' onClick={() => setPlayerUsername(usernameInput)}>Start</button>
      </div>
    </div>
  )
}


export default Gameboard;