import useGameState from "../hooks/useGameState";

const StatsPanel = () => {
  const { resetScore, resetGameState } = useGameState();
  return (
    <div className='flex flex-col gap-4 items-center py-3 max-w-[800px] mx-auto w-full bg-amber-500'>
      <span>Stats panel</span>
      <div className='grid grid-rows-2 grid-cols-2 w-2/3'>
        <label>You:</label>
        <span>0</span>
        <label>Cpu:</label>
        <span>0</span>
        <label>Draws</label>
        <span>0</span>
      </div>
      <button className='self-end mr-2 text-gray-300' onClick={resetScore}>Reset score</button>
      <div className='h-1 bg-gray-500 w-11/12 mx-auto rounded-full' />
      <div className='grid grid-cols-2 my-4'>
        <label>Longest win streak</label>
        <span>0</span>
      </div>
      <button className='self-end mr-2 text-gray-300' onClick={resetGameState}>New Game</button>
    </div>
  )
}

export default StatsPanel;