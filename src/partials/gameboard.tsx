import { HiddenCard, Card } from '../components/card';
import UsernamePanel from '../components/username-panel';

const Gameboard = () => {
  return (
    <div className='flex flex-col w-full max-w-screen-md mx-auto bg-amber-300'>
      <section id='opponent' className='flex flex-row items-start justify-center gap-4'>
        <div className='flex flex-row justify-end gap-4 bg-green-300 overflow-hidden'>
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

      <section id='opponent' className='flex flex-row items-end'>
        <UsernamePanel username='Player 1' />
        <div className='flex flex-row justify-center gap-4 bg-green-300 w-full max-w-xl mx-auto overflow-hidden'>
          <HiddenCard />
          <HiddenCard />
          <HiddenCard />
          <HiddenCard />
          <HiddenCard />
        </div>
      </section>
    </div>
  );
}

export default Gameboard;