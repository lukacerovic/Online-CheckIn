import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/account/accountSlice';
import { FaBath } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function HotelProfile() {
  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount;
  const [listings, setListings] = useState(undefined);
  const [showListingsError, setShowListingsError] = useState(false);
 
  SwiperCore.use([Navigation]);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/rooms/listings/${currentUserData._id}`);
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
  }, [currentUserData._id]);

  
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signoutUser'); // ne moramo da definisemo metod jer koristimo get a ne post metodu a get je po difoltu postavljen
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigation('/sign-in-hotel')
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleDeleteHotel = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/hotel/deleteHotel/${currentUserData._id}`, {
        method: 'DELETE',
        // ne treba nam headers i body
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      // ako je sve u redu
      dispatch(deleteUserSuccess(data));
      navigation('/');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className='mx-auto flex flex-col'>
      <Header/>
      <h1 className='text-3xl text-white font-semibold text-center my-10'>{currentUserData.hotelName}</h1>
      <form className='self-center w-full'>
        <div className='flex flex-col'>
          <img className='rounded shadow h-30 w-40 object-cover cursor-pointer self-center mt-2' src={currentUserData.logo} alt="profile" style={{position:'absolute',}}/>
          <img className='object-cover' src='https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D' style={{height:'30vw'}}/>
        </div>
      </form>
      <div className='flex text-white justify-between w-[80%] self-center items-center mb-10' >
        <div className='flex gap-4 mt-5'>
          <Link to={`/hotel-edit/${currentUserData._id}`}>
            <button className='bg-slate-700 rounded-lg uppercase p-3 cursor-pointer'>Edit Profile</button>
          </Link>
          <Link to={'/create-room'}>
            <button className='bg-green-700 rounded-lg p-3 uppercase cursor-pointer'>Create Listing</button>
          </Link>   
        </div>
        <div className='flex gap-4 mt-5'>
          <span onClick={handleDeleteHotel} className='bg-red-700 rounded-lg p-3 uppercase cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='bg-red-700 rounded-lg p-3 uppercase cursor-pointer'>Sign out</span>
        </div>
      </div>
      {listings && listings.length > 0 && 
        <div className='flex flex-col mt-10 mb-10 w-[80%] self-center'>
          <h1 className='text-white text-3xl self-center mb-10'>Your All Listings</h1>
          {listings.map((listing) => (
          <div className='rounded p-5 mb-5' style={{background:'rgba(229, 228, 226, 0.1)'}}>
            <div className='flex sm:flex-col md:flex-col lg:flex-col bg-transparent'>
              <div className='flex bg-transparent lg:w-full sm:self-center'>
                {/* <img style={{height:'20vw'}} className='rounded' src={listing.imageUrls[0]}/> */}
                <div className='ml-3 bg-transparent'>
                  {listing.imageUrls.length > 0 ? (
                    <Swiper navigation style={{height:'30vw', width:'75vw'}}>
                      {listing.imageUrls.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} className='object-cover' style={{width:'100%'}} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  ) : (
                    <img style={{height:'8vw'}} className='rounded mb-3' src='https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906'/>
                  )}
                </div>
              </div>
              <div className='bg-transparent ml-10 flex flex-col flex-1'>
                <h1 className='bg-transparent text-white text-md md:text-lg lg:text-xl xl:text-2xl capitalize'>{listing.name}</h1>
                <p className='bg-transparent text-white pt-3'>{listing.address}</p>   
                <div className='flex bg-transparent gap-6 mt-3'>
                  <span className='flex items-center bg-transparent gap-2'>
                    <IoPersonSharp color='white' className='bg-transparent md:text-lg lg:text-xl xl:text-2xl'/>
                    <p className='bg-transparent text-white'>{listing.numberOfGuests}</p>
                  </span>
                  <span className='flex items-center bg-transparent gap-2'>
                    <IoBedSharp color='white' className='bg-transparent md:text-lg lg:text-xl xl:text-2xl' />
                    <p className='bg-transparent text-white'>{listing.bedrooms}</p>
                  </span>
                  <span className='flex items-center bg-transparent gap-2'>
                    <FaBath color='white' className='bg-transparent md:text-lg lg:text-xl xl:text-2xl' />
                    <p className='bg-transparent text-white'>{listing.bathrooms}</p>
                  </span>
                </div> 
                <div className='flex flex-wrap gap-3 mt-3 text-white capitalize bg-transparent'>
                  {listing.includes.map((item, index) => (
                    <div key={index} className='bg-gray-500 px-3 py-1 rounded-lg'>
                      <p className='bg-transparent'>{item}</p>
                    </div>
                  ))}
                </div>
                <p className='bg-transparent text-white mt-3' style={{width:'100%'}}>{listing.description}</p>
                <h1 className='bg-transparent md:text-lg lg:text-xl xl:text-2xl text-white mt-3'>Price: {listing.price}$ / night</h1>
                <h1 className='bg-transparent md:text-md lg:text-lg xl:text-xl text-white mt-10'>Number of rooms: {listing.availableRooms}</h1>
                <h1 className='bg-transparent md:text-md lg:text-lg xl:text-xl text-white mt-1'>Number of booked rooms: {listing.availableRooms}</h1>
                <div className='self-end bg-transparent mr-3' style={{float:'left'}}>
                  <Link to={`/book-room-details/${listing._id}`}>
                    <button className='bg-cyan-700 p-3 text-white md:text-lg lg:text-xl xl:text-2xl rounded-lg'>View bookings</button>
                  </Link>
                </div>  
              </div>  
            </div>    
          </div>
          ))}
        </div>
      }
    </div>
  )
}
