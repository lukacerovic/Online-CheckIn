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

export default function HotelLIstings() {
  const [listings, setListings] = useState(undefined);
  const [showListingsError, setShowListingsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className='bg-slate-200 shadow-md' style={{height:'30vh'}}>
        <h1 className='text-5xl bg-transparent text-center'>Spline Animation Place</h1>
      </div>
      <div className='self-end mb-10 items-center mr-10 mt-10' style={{ width:'60%' }}>
        <div className='flex justify-between'>
            <h1 className='text-white text-3xl text-center'>Hotel Listings</h1>
            <FaFilter size={30} color='white' className=""/>
        </div>   
      </div>
      <input 
        type='text' 
        placeholder='Search...' 
        className='mb-10 border p-3 rounded-2xl text-white text-lg self-center' 
        style={{width:'80%'}}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredListings && filteredListings.length > 0 && 
        filteredListings.map((listing) => (
          <div className='mb-8 container self-center' key={listing._id}>
            <div className='self-center w-full'>
                <div className='flex flex-col'>
                <img className='rounded shadow h-30 w-40 object-cover cursor-pointer self-center mt-2' src={listing.logo} alt="profile" style={{position:'absolute',}}/>
                {listing.imageUrls.length > 1 ? (
                  <Swiper navigation className='w-full'>
                    {listing.imageUrls.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} className='object-cover w-full' style={{height:'40vw'}}/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img src={listing.imageUrls[0]} style={{height:'40vw'}}/>
                )}
                </div>
            </div>
            <div className="mx-5 text-white py-3">
                <h1 className="text-3xl capitalize">{listing.name}</h1>
                <p className='mt-3'>{listing.address}</p>
                <p>{listing.description}</p>
                <div className='flex gap-6 mt-3'>
                    <span className='flex items-center bg-transparent gap-2'>
                        <IoPersonSharp color='white' className='bg-transparent' size={30}/>
                        <p className='bg-transparent text-white'>{listing.numberOfGuests}</p>
                    </span>
                    <span className='flex items-center bg-transparent gap-2'>
                        <IoBedSharp color='white' className='bg-transparent' size={30} />
                        <p className='text-white'>{listing.bedrooms}</p>
                    </span>
                    <span className='flex items-center bg-transparent gap-2'>
                        <FaBath color='white' className='bg-transparent' size={30} />
                        <p className='text-white'>{listing.bathrooms}</p>
                    </span>
                </div> 
                <div className='flex flex-wrap gap-3 mt-3 text-white capitalize bg-transparent'>
                  {listing.includes.map((item, index) => (
                    <div key={index} className='bg-gray-500 px-3 py-2 rounded-lg'>
                      <p className='bg-transparent'>{item}</p>
                    </div>
                  ))}
                </div>
                <h1 className="text-2xl mt-5">Price: {listing.price}$ / night</h1>
                <h1 className="text-2xl mt-5">Available Rooms: {listing.availableRooms}</h1>
            </div>
            <div className='flex bg-transparent mr-3 gap-10 mb-10' style={{float:'right'}}>
              <Link to={`/book-room/${listing._id}`}>
                <button className='bg-green-700 p-3 text-white text-2xl rounded-lg'>Book now</button>
              </Link>
                <button className='bg-slate-700 p-3 text-white text-2xl rounded-lg'>Explore more</button>
            </div> 
          </div>  
        ))
      }
    </div>
  )
}