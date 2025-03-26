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
      <Gameboard />
    </>
  )
}

export default App
