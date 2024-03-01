import {useState, Suspense} from 'react'
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Appartment from '../../public/model/Appartment';

export default function YourRoom() {
    const room = useParams();
    const [count, setCount] = useState(0);
  return (
    <div className='flex flex-col items-center justify-center text-white gap-10'>
        <h1 className='text-7xl'>
            Welcome to Your Room
        </h1>
        <h1 className='text-9xl'>{room.roomNo}</h1>
        <Canvas style={{height:'80vw'}}>
          <ambientLight /> 
          <OrbitControls enableZoom={false}/>
          <Suspense fallback={null}>
            <Appartment/>
          </Suspense>
          <Environment preset='sunset'/>
        </Canvas>
    </div>
  )
}
