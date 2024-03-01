import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import { MdQrCode2 } from "react-icons/md";
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/account/accountSlice';
import {QRCodeSVG} from 'qrcode.react';

export default function Profile() {
  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount;
  const [bookings, setBookings] = useState(undefined);
  const [showBookingsError, setBookingsError] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);

  const openQRPopup = () => {
    setShowQRPopup(true);
  };

  console.log(bookings);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // bookings info for this user:
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBookingsError(false);
        const res = await fetch(`/api/tourist/my-bookings/${currentUserData._id}`);
        if (!res.ok) {
          throw new Error('HTTP error, status = ' + res.status);
        }
        const data = await res.json();
        console.log("Ovo je data za bookings: ", data);
        if (!Array.isArray(data)) {
          throw new Error('Data is not in the expected format');
        }
        setBookings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setBookingsError(true);
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
      navigation('/sign-in-tourist')
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleDeleteTourist = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/tourist/deleteTourist/${currentUserData._id}`, {
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
      <h1 className=' text-md md:text-lg lg:text-xl xl:text-3xl text-white font-semibold text-center my-10 capitalize'>Welcome <br/>{currentUserData.name} {currentUserData.lastName}</h1>
      <img className='rounded shadow object-cover cursor-pointer self-center mt-2' style={{width:'15vw'}} src={currentUserData.profileImage} alt="profile"/>
      <div className='flex text-white justify-between w-[80%] self-center items-center mb-10' >
        <div className='flex gap-4 mt-5'>
          <Link to={`/tourist-edit/${currentUserData._id}`}>
            <button className='bg-slate-700 rounded-lg uppercase cursor-pointer' style={{fontSize:'1.2vw', padding:'0.7vw'}}>Edit Profile</button>
          </Link>
        </div>
        <div className='flex gap-4 mt-5'>
          <span onClick={handleDeleteTourist} className='bg-red-700 rounded-lg uppercase cursor-pointer' style={{fontSize:'1.2vw', padding:'0.7vw'}}>Delete Account</span>
          <span onClick={handleSignOut} className='bg-red-700 rounded-lg uppercase cursor-pointer' style={{fontSize:'1.2vw', padding:'0.7vw'}}>Sign out</span>
        </div>
      </div>
      {bookings && bookings.length > 0 && 
        <div className='flex flex-col mt-10 mb-10 w-[80%] self-center'>
          <h1 className='text-white text-lg md:text-xl lg:text-3xl xl:text-5xl self-center mb-10'>Your All Bookings</h1>
          {bookings.map((booking) => (
            <div className='rounded p-5 mb-5' style={{background:'rgba(229, 228, 226, 0.1)'}}>
              <div className='flex flex-col bg-transparent'>
                <div className='flex bg-transparent w-full'>
                  <img style={{width:'100%', height:'30vw'}} className='rounded object-cover' src={booking.hotelImage}/>
                </div>
                <div className='bg-transparent flex flex-col'>
                  <h1 className='bg-transparent text-white text-sm md:text-xl lg:text-2xl xl:text-4xl capitalize'>{booking.hotelName}</h1>
                  <div className='flex items-center bg-transparent' style={{marginTop:'5vw', gap:'1vw'}}>
                    <h1 className='bg-transparent text-white' style={{fontSize:'1.5vw'}}>Booking created at:</h1>
                    <h1 className='bg-gray-500 p-1 rounded-lg text-white' style={{fontSize:'1.5vw'}}>{new Date(booking.createdAt).toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit'})}</h1>
                  </div>
                  {booking.assignedRoom ? (
                    <div className='flex justify-between bg-transparent'>
                      <div className='flex items-center bg-transparent' style={{marginTop:'5vw', gap:'1vw'}}>
                        <h1 className='bg-transparent text-white' style={{fontSize:'1.5vw'}}>Booking Status:</h1>
                        <h1 className='bg-transparent text-green-500' style={{fontSize:'1.5vw'}}>Booking Confirmed!</h1>
                      </div>
                      <div className='bg-cyan-700 rounded-lg flex items-center gap-3' style={{padding:'1vw'}} onClick={openQRPopup}>
                        <button className='text-white' style={{fontSize:'2vw'}}>Your QR Key</button>
                        <MdQrCode2 className='bg-transparent' color='white' size={'3vw'}/>
                      </div>
                      {showQRPopup && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white rounded-lg flex flex-col" style={{gap:'5vw', padding:'5vw'}}>
                            <h1 className='text-dark bg-transparent' style={{fontSize:'2vw'}} >This is your key for your room</h1>
                            <QRCodeSVG value={booking.qrCode} className='self-center' style={{width:'20vw', height:'20vw'}}/>
                            <button className="bg-cyan-700 text-white rounded-md mt-4" style={{fontSize:'2vw', padding:'1vw'}} onClick={() => setShowQRPopup(false)}>Close</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex items-center bg-transparent' style={{marginTop:'2vw', gap:'1vw'}}>
                      <h1 className='bg-transparent text-white' style={{fontSize:'1.5vw'}}>Booking Status:</h1>
                      <h1 className='bg-transparent text-gray-500 ' style={{fontSize:'1.5vw'}}>Waithing To Confirm</h1>
                    </div>
                  )}
                </div>  
              </div>    
            </div>
          ))}
        </div>
      }
    </div>
  )
}
