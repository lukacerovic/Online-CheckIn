import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import Header from '../components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import HotelLIstingsAnimation from '../components/HotelListingsAnimation.jsx'
import { useSelector } from 'react-redux';

export default function HotelLIstings() {
  const [listings, setListings] = useState(undefined);
  const [showListingsError, setShowListingsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount;

  console.log(currentUserData);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch('/api/rooms/allListings');
        if (!res.ok) {
          throw new Error('HTTP error, status = ' + res.status);
        }
        const data = await res.json();
        console.log("Ovo je data za listings: ", data);
        if (!Array.isArray(data)) {
          throw new Error('Data is not in the expected format');
        }
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setShowListingsError(true);
      }
    };
  
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredListings = listings && listings.filter(listing => {
    return listing.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className=' flex flex-col' style={{width:'100%'}}>
      <Header/>
      <div className='self-center'>
        <HotelLIstingsAnimation/>
      </div>
      <div className='self-end mb-10 items-center mr-10 mt-10' style={{ width:'60%' }}>
        <div className='flex justify-between'>
            <h1 className='text-white text-center' style={{fontSize:'3vw'}}>Hotel Listings</h1>
            <FaFilter size={'3vw'} color='white' className=""/>
        </div>   
      </div>
      <input 
        type='text' 
        placeholder='Search...' 
        className='mb-10 border rounded-lg text-white self-center' 
        style={{width:'80%',fontSize:'2vw', padding:'1vw'}}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredListings && filteredListings.length > 0 && 
        filteredListings.map((listing) => (
          <div className='container self-center' style={{marginBottom:'5vw'}} key={listing._id}>
            <div className='self-center w-full'>
                <div className='flex flex-col'>
                <img className='rounded shadow object-cover cursor-pointer self-center mt-2' src={listing.logo} alt="profile" style={{position:'absolute', width:'15vw'}}/>
                {listing.imageUrls.length > 1 ? (
                  <Swiper navigation className='w-full'>
                    {listing.imageUrls.map((image, index) => (
                      <SwiperSlide key={index} className='text-pink-500'>
                        <img src={image} className='object-cover w-full' style={{height:'30vw', width:'100%'}}/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img src={listing.imageUrls[0]} className='object-cover' style={{height:'30vw', width:'100%'}}/>
                )}
                </div>
            </div>
            <div className="mx-5 text-white py-3">
                <h1 className="capitalize" style={{fontSize:'2vw'}}>{listing.name}</h1>
                <h1 style={{fontSize:'1.5vw', paddingTop:'1vw', paddingBottom:'1vw'}}>{listing.address}</h1>
                <p style={{fontSize:'1vw'}}>{listing.description}</p>
                <div className='flex mt-3' style={{gap:'3vw'}}>
                    <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
                        <IoPersonSharp color='white' className='bg-transparent' size={'2vw'}/>
                        <p className='bg-transparent text-white' style={{fontSize:'1.3vw'}}>{listing.numberOfGuests}</p>
                    </span>
                    <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
                        <IoBedSharp color='white' className='bg-transparent' size={'2vw'} />
                        <p className='text-white' style={{fontSize:'1.3vw'}}>{listing.bedrooms}</p>
                    </span>
                    <span className='flex items-center bg-transparent' style={{gap:'1vw'}}>
                        <FaBath color='white' className='bg-transparent' size={'2vw'} />
                        <p className='text-white' style={{fontSize:'1.3vw'}}>{listing.bathrooms}</p>
                    </span>
                </div> 
                <div className='flex flex-wrap mt-3 text-white capitalize bg-transparent' style={{gap:'1vw'}}>
                  {listing.includes.map((item, index) => (
                    <div key={index} className='bg-gray-500 rounded-lg'>
                      <p className='bg-transparent' style={{fontSize:'1vw', padding:'0.5vw'}}>{item}</p>
                    </div>
                  ))}
                </div>
                <h1 style={{fontSize:'1.5vw', paddingTop:'1vw'}}>Price: {listing.price}$ / night</h1>
                <h1 style={{fontSize:'1.5vw', paddingTop:'1vw'}}>Available Rooms: {listing.availableRooms}</h1>
            </div>
            <div className='flex bg-transparent mr-3 gap-10 mb-10' style={{float:'right'}}>
              {currentUserData.type !== 'hotel' && (
                <Link to={`/book-room/${listing._id}`}>
                  <button className='bg-green-700 text-white rounded-lg' style={{fontSize:'1.5vw', padding:'0.7vw'}}>Book now</button>
                </Link>
              )}
              
              <Link to={`/room-details/${listing._id}`}>
                <button className='bg-slate-700 text-white rounded-lg' style={{fontSize:'1.5vw', padding:'0.7vw'}}>Explore more</button>
              </Link>  
            </div> 
          </div>  
        ))
      }
    </div>
  )
}