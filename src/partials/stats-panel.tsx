import useGameState from "../hooks/useGameState";

const StatsPanel = () => {
  const { resetScore, resetGameState, gameState } = useGameState();
  const { playerScore, cpuScore, draws, longestWinningStreak, currentStreak } = gameState;
  return (
    <div className='flex flex-col gap-4 items-center py-3 max-w-[800px] mx-auto w-full bg-gray-700 rounded-xl shadow-md'>
      <span className='text-lg font-semibold'>Stats panel</span>
      <div className='grid grid-rows-2 grid-cols-2 w-2/3'>
        <label>You:</label>
        <span>{playerScore}</span>
        <label>Cpu:</label>
        <span>{cpuScore}</span>
        <label>Draws</label>
        <span>{draws}</span>
      </div>
      <button className='self-end mr-2 text-gray-300' onClick={resetScore}>Reset score</button>
      <div className='h-1 bg-gray-500 w-11/12 mx-auto rounded-full' />
      <div className='grid grid-cols-2 my-4'>
        <label>Longest win streak</label>
        <span>{longestWinningStreak}</span>
        <label>Current streak</label>
        <span>{currentStreak}</span>
      </div>
      <button className='self-end mr-2 text-gray-300' onClick={resetGameState}>New Game</button>
    </div>
  )
}

export default StatsPanel;