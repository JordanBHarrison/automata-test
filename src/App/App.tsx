import automataLogo from '../assets/automata.png'
import { Gameboard } from '../partials'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://automata.tech/" target="_blank">
          <img src={String(automataLogo)} className="logo automata" alt="Automata logo"/>
        </a>
      </div>
      <h2 className='text-lg'>Rock, Paper, Scissors, Lizard, Spock</h2>
      <div className='grid grid-cols-1 gap-4 w-full items-center justify-center lg:grid-cols-[1.5fr_1fr]'>
        <Gameboard />
        <div className='py-3 max-w-[800px] mx-auto w-full bg-amber-500'>
          <span>Stats panel</span>
          <div className='grid grid-rows-2 grid-cols-2 my-4'>
            <label>You:</label>
            <span>0</span>
            <label>Cpu:</label>
            <span>0</span>
            <label>Draws</label>
            <span>0</span>
          </div>
          <a className='bg-amber-100 text-gray-500 text-xs rounded-lg py-2 px-3 col-start-2'>Reset score</a>
          <div className='h-1 bg-gray-500 w-11/12 mx-auto rounded-full' />
          <div className='grid grid-cols-2 my-4'>
            <label>Longest win streak</label>
            <span>0</span>
          </div>
          <button className='bg-blue-500 text-gray-500 rounded-lg p-2 col-start-2'>Reset score</button>
        </div>
      </div>
    </>
  )
}

export default App
