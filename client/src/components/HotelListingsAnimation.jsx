import React from 'react'
import Spline from '@splinetool/react-spline';

export default function Animations() {
  return (
    <div style={{ width:'100%'}} className='bg-blue-500'>
      <Spline style={{height:'20vw', width:'100%'}} scene="https://prod.spline.design/RjytrQarjL8DS1af/scene.splinecode" />
    </div>
  )
}