import { HiddenCard, Card } from '../components/card';
import { CardValues } from '../context/game-state-context';
import UsernamePanel from '../components/username-panel';

const Gameboard = () => {
  return (
    <div className='flex flex-col w-full max-w-[800px] mx-auto bg-amber-300'>
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
      <section id='mid-board' className='flex flex-row justify-center gap-4 my-16'>
        
        <div className={`aspect-4/5 border-2 border-dashed w-24 rounded-xl`} />
        <div className={`aspect-4/5 border-2 border-dashed w-24 rounded-xl`} />

      </section>

      <section id='player' className='flex flex-row items-center gap-4'>
        <UsernamePanel username='Player 1' className='hidden md:block'/>
        <div className='relative flex flex-row justify-center gap-3 bg-gray-300 w-full max-w-xl p-4 pt-12 rounded-t-xl mx-auto overflow-hidden md:pt-4'>
          <UsernamePanel username='Player 1' className='absolute top-2 left-4 shadow-none bg-white/40 md:hidden' compact />
          <Card value={CardValues.ROCK} />
          <Card value={CardValues.PAPER} />
          <Card value={CardValues.SCISSORS} />
          <Card value={CardValues.LIZARD} />
          <Card value={CardValues.SPOCK} />
        </div>
      </section>
    </div>
  );
}

export default Gameboard;