import { useState } from 'react';
import FaceDownCard from '../components/face-down-card';


const Gameboard = () => {
  return (
    <div className='flex flex-col max-w-2xl mx-auto bg-amber-300 p-8'>
      <div className='flex flex-row gap-4 bg-green-300 w-full max-w-xl mx-auto overflow-hidden'>
        <FaceDownCard className='transform -translate-y-1/3' />
        <FaceDownCard className='transform -translate-y-1/3' />
        <FaceDownCard className='transform -translate-y-1/3' />
        <FaceDownCard className='transform -translate-y-1/3' />
        <FaceDownCard className='transform -translate-y-1/3' />
      </div>

    </div>
  );
}

export default Gameboard;