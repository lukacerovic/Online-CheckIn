import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { IoBedSharp, IoPersonSharp } from 'react-icons/io5';
import { FaBath } from 'react-icons/fa';
import { useSelector } from 'react-redux';


export default function RoomDetails() {
    const [showListingsError, setShowListingsError] = useState(false);
    const [roomDetails, setRoomDetails] = useState({});
    const [ownerEmail, setOwnerEmail] = useState('');
    const roomId = useParams();
    const currentUser = useSelector((state) => state.account);
    const currentUserData = currentUser.currentAccount;
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            setShowListingsError(false);
            const res = await fetch(`/api/rooms/roomDetails/${roomId.id}`);
            if (!res.ok) {
              throw new Error('HTTP error, status = ' + res.status);
            }
            
            const data = await res.json();
          
            setRoomDetails(data._doc);
            setOwnerEmail(data.hotelEmail);

          } catch (error) {
            console.error('Error fetching listings:', error);
            setShowListingsError(true);
          }
        };
      
        fetchData();

      }, []);

      const onChange = (e) => {
        setMessage(e.target.value);
      };
  return (
    <div className='flex flex-col gap-10'>
        <Header/>
        <div className='flex flex-col items-center'>
            <h1 className='text-white mt-10 uppercase' style={{fontSize:'3vw'}}>{roomDetails.name}</h1>
            <p className='text-white py-10' style={{fontSize:'1.5vw'}}>{roomDetails.address}</p>
            <div className='flex flex-wrap gap-7 justify-center'>
              {roomDetails.imageUrls && roomDetails.imageUrls.length > 0 && roomDetails.imageUrls.map((image) => (        
                <img src={image} className='object-cover hover:scale-110 transition-transform duration-300 ease-in-out' style={{width:'30vw', borderRadius:'5%'}}/>
              ))
              }
            </div>
        </div>
        <div className='flex gap-8 flex-wrap text-white mt-20 justify-center'>
          {roomDetails.includes && roomDetails.includes.map((item, index) => (
            <div key={index} className='bg-gray-500 rounded-lg'>
              <h1 className='bg-transparent' style={{fontSize:'1.8vw', padding:'1vw'}}>{item}</h1>
              </div>
          ))}
        </div>
        <div className='flex justify-center flex-wrap text-white' style={{gap:'3vw'}}>
          <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
            <IoPersonSharp color='white' className='bg-transparent' size={'3vw'}/>
            <p className='bg-transparent text-white' style={{fontSize:'1.3vw'}}>{roomDetails.numberOfGuests}</p>
          </span>
          <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
            <IoBedSharp color='white' className='bg-transparent' size={'3vw'} />
            <p className='text-white' style={{fontSize:'1.3vw'}}>{roomDetails.bedrooms}</p>
          </span>
          <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
            <FaBath color='white' className='bg-transparent' size={'3vw'} />
            <p className='text-white' style={{fontSize:'1.3vw'}}>{roomDetails.bathrooms}</p>
          </span>
          <h1 style={{fontSize:'2vw', paddingTop:'1vw'}}>Price: {roomDetails.price}$ / night</h1>
          <h1 style={{fontSize:'2vw', paddingTop:'1vw'}}>Available Rooms: {roomDetails.availableRooms}</h1>
        </div> 
        <div style={{width:'85%'}} className='self-center mt-10'>
          <h1 className='text-white text-center' style={{fontSize:'1.5vw'}}>
            {roomDetails.description}
          </h1>
        </div>
        {currentUserData._id != roomDetails.userRef && (
          <div className='self-center'>
            <button type='button' onClick={() => setShowForm(true)} className='flex gap-5 justify-center items-center bg-gray-700 text-white rounded-lg' style={{fontSize:'2vw', marginTop:'10vw', paddingInline:'3vw', paddingTop:'2vw', paddingBottom:'2vw'}}>
              Contact <img style={{width:'5vw',height:'5vw', borderRadius:'50%'}} src={roomDetails.logo} />
            </button>
          </div>
        )} 
        {showForm && (
          <form style={{width:'60vw'}}className='flex flex-col gap-3 mt-5 text-xl self-center mb-10'> 
            <textarea className='p-3 h-60 rounded-lg' style={{background:'#f0f8ff '}} type='text' placeholder='Message' name='message' id='message' onChange={onChange}/>
            <Link to={`mailto:${ownerEmail}?subject=Regarding ${roomDetails.name}&body=${message}`} className='w-full bg-green-500 p-3 rounded-lg text-xl uppercase text-center'>Send  Message</Link>
          </form> 
        )}
        
        <Link to={`/book-room/${roomDetails._id}`} className='self-center'>
          <button className='bg-green-700 text-white rounded-lg' style={{fontSize:'2vw', marginTop:'1vw', marginBottom:'8vw', width:'60vw', padding:'0.7vw'}}>Book now</button>
        </Link>
    </div>
  )
}
