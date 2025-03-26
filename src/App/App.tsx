import automataLogo from '../assets/automata.png'
import { Gameboard, StatsPanel } from '../partials'
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
        <StatsPanel />
      </div>
    </>
  )
}

export default App
