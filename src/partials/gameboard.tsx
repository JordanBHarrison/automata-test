import { useState, useEffect } from 'react';
import { HiddenCard, Card } from '../components/card';
import { CardValues } from '../context/game-state-context';
import UsernamePanel from '../components/username-panel';
import useGameState from '../hooks/useGameState';

type GameboardProps = {
}
const Gameboard = () => {
  const { gameState, setPlayerUsername, setPlayerChoice, setIsRoundEnded  } = useGameState();
  const { playerUsername, isRoundEnded, playerCurrentChoice, cpuCurrentChoice } = gameState;

  useEffect(() => {
  if (playerCurrentChoice && !isRoundEnded) {
      // CPU choice logic
      makeCpuChoice();
      determineWinner();
    }
  }, [playerCurrentChoice])

  const makeCpuChoice = () => {
    const choices = Object.values(CardValues);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  const determineWinner = () => {
  }

  return (
    <div className='flex flex-col w-full max-w-[800px] mx-auto bg-amber-300'>
      {!playerUsername && <NewUserModal setPlayerUsername={setPlayerUsername} />}
      <OpponentArea />
      <MidBoard playerChoice={playerCurrentChoice} cpuChoice={cpuCurrentChoice} />
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
      <div className='flex flex-row justify-center px-2 gap-3 bg-gray-300 rounded-b-xl overflow-hidden'>
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
  playerChoice: CardValues | null
  cpuChoice: CardValues | null
}

const MidBoard = ({ playerChoice, cpuChoice }: MidBoardProps) => {
  return (
    <section id='mid-board' className='flex flex-row justify-center gap-4 my-16'>
      {playerChoice ? <Card value={playerChoice} /> : <div className={`aspect-4/5 border-2 border-dashed w-24 rounded-xl`} />}
      {cpuChoice ? <Card value={cpuChoice} /> : <div className={`aspect-4/5 border-2 border-dashed w-24 rounded-xl`} />}
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
      {username && <UsernamePanel username={username} className='hidden md:block'/>}
      <div className='relative flex flex-row justify-center gap-3 bg-gray-300 w-full max-w-xl p-4 pt-12 rounded-t-xl mx-auto overflow-hidden md:pt-4'>
        {username && <UsernamePanel username={username} className='absolute top-2 left-4 shadow-none bg-white/40 md:hidden' compact />}
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