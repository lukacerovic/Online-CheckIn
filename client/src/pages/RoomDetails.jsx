import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

export default function RoomDetails() {
    const [showListingsError, setShowListingsError] = useState(false);
    const [roomDetails, setRoomDetails] = useState({});
    const roomId = useParams();

    console.log(roomDetails);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setShowListingsError(false);
            const res = await fetch(`/api/rooms/roomDetails/${roomId.id}`);
            if (!res.ok) {
              throw new Error('HTTP error, status = ' + res.status);
            }

            const data = await res.json();
            setRoomDetails(data);

          } catch (error) {
            console.error('Error fetching listings:', error);
            setShowListingsError(true);
          }
        };
      
        fetchData();

      }, []);
  return (
    <div>
        <Header/>
        <div className='flex flex-col items-center'>
            <h1 className='text-white mt-10'>{roomDetails.name}</h1>
        </div>
    </div>
  )
}
