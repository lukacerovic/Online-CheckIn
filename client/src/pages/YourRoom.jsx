import React from 'react'
import { useParams } from 'react-router-dom';

export default function YourRoom() {
    const room = useParams();
  return (
    <div className='flex flex-col items-center justify-center text-white gap-10'>
        <h1 className='text-7xl'>
            Welcome to Your Room
        </h1>
        <h1 className='text-9xl'>{room.roomNo}</h1>
    </div>
  )
}
