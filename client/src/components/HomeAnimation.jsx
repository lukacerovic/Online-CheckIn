import React from 'react'
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';

export default function Animations() {
  return (
    <div className="flex items-center justify-between ml-5 mr-5 animations">
      <div className="flex flex-col items-center">
        <Spline scene="https://prod.spline.design/e2Sx2F8HCg38hWcD/scene.splinecode" />
        <Link to='/sign-in-hotel'>
          <button className="bg-cyan-500 p-3 rounded hover:bg-cyan-700 mt-3" type="button">
            Hotel Profile
          </button>
        </Link>
        
      </div>
      <div className="flex flex-col items-center">
        <Spline scene="https://prod.spline.design/JD1zE9MTrPlhJ1Vb/scene.splinecode" />
        <Link to='/sign-in-tourist'>
          <button className="bg-red-700 p-3  rounded hover:bg-red-500 mt-3" type="button">
            Tourist Profile
          </button>
        </Link>
        
      </div>
    </div>
  )
}