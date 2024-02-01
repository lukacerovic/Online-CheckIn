import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import Header from '../components/Header';

export default function Profile() {

  return (
    
    <div className=' flex flex-col'>
      <Header/>
      <div className='bg-slate-200 shadow-md' style={{height:'30vh'}}>
        <h1 className='text-5xl bg-transparent text-center'>Spline Animation Place</h1>
      </div>
      <div className='self-end mb-10 items-center mr-10 mt-10' style={{ width:'60%' }}>
        <div className='flex justify-between'>
            <h1 className='text-white text-3xl text-center'>Hotel Listings</h1>
            <FaFilter size={30} color='white' className=""/>
        </div>   
      </div>
      <input type='text' placeholder='Search...' className='mb-10 border p-3 rounded-2xl text-white text-lg self-center' style={{width:'80%'}}/>
      <div className='mb-8'>
        <div className='self-center w-full'>
            <div className='flex flex-col'>
            <input type='file' hidden/>
            <img className='rounded shadow h-30 w-40 object-cover cursor-pointer self-center mt-2' src='https://pointmetotheplane.boardingarea.com/wp-content/uploads/2016/06/Radisson-Blu.jpg' alt="profile" style={{position:'absolute',}}/>
            <img src='https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D' style={{height:'40vh'}}/>
            </div>
        </div>
        <div className="mx-5 text-white py-3">
            <h1 className="text-3xl">Radisson Blue | Junior Queen's  Suite </h1>
            <p className='mt-3'>Barcelona | Spain</p>
            <p>London Heathrow Airport</p>
            <div className='flex gap-6 mt-3'>
                <span className='flex items-center bg-transparent gap-2'>
                    <IoPersonSharp color='white' className='bg-transparent' size={30}/>
                    <p className='bg-transparent text-white'>2 persons</p>
                </span>
                <span className='flex items-center bg-transparent gap-2'>
                    <IoBedSharp color='white' className='bg-transparent' size={30} />
                    <p className='text-white'>1 Queen's size</p>
                </span>
                </div> 
            <h1 className="text-2xl mt-5">Price: 120$ / night</h1>
            
        </div>
        <div className='flex bg-transparent mr-3 gap-10 mb-10' style={{float:'right'}}>
            <button className='bg-green-700 p-3 text-white text-2xl rounded-lg'>Book now</button>
            <button className='bg-slate-700 p-3 text-white text-2xl rounded-lg'>Explore more</button>
        </div> 
      </div>   
    </div>
  )
}