import React from 'react'
import { Link } from 'react-router-dom'

export default function Registration() {
  return (
    <div className='flex flex-col justify-center text-white' style={{borderTopWidth:'1px', marginTop:'10vw'}}>
        <h1 className='self-center text-xl md:text-2xl lg:ext-4xl xl:text-5xl py-5'>Fast Registration Links</h1>
        <div className='flex self-center justify-between py-10' style={{width:'80%'}}>
            <Link to='/sign-up-hotel'>
                <h1 className='text-lg md:text-xl lg:ext-3xl xl:text-3xl underline text-blue-300'>Sign Up Hotel</h1>
            </Link>
            <Link to='/sign-in-hotel'>
                <h1 className='text-lg md:text-xl lg:ext-3xl xl:text-3xl underline text-blue-300'>Sign In Hotel</h1>
            </Link>
            <Link to='/sign-up-tourist'>
                <h1 className='text-lg md:text-xl lg:ext-3xl xl:text-3xl underline text-blue-300'>Sign Up Tourist</h1>
            </Link>
            <Link to='/sign-in-tourist'>
                <h1 className='text-lg md:text-xl lg:ext-3xl xl:text-3xl underline text-blue-300'>Sign In Tourist</h1>
            </Link>
        </div>    
    </div>
  )
}
