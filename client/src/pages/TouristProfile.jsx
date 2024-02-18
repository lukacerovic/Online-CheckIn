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
      <h1 className='text-3xl text-white font-semibold text-center my-10 capitalize'>Welcome <br/>{currentUserData.name} {currentUserData.lastName}</h1>
      <img className='rounded shadow h-30 w-40 object-cover cursor-pointer self-center mt-2' src={currentUserData.profileImage} alt="profile"/>
      <div className='flex text-white justify-between w-[80%] self-center items-center mb-10' >
        <div className='flex gap-4 mt-5'>
          <Link to={`/tourist-edit/${currentUserData._id}`}>
            <button className='bg-slate-700 rounded-lg uppercase p-3 cursor-pointer'>Edit Profile</button>
          </Link>
        </div>
        <div className='flex gap-4 mt-5'>
          <span onClick={handleDeleteTourist} className='bg-red-700 rounded-lg p-3 uppercase cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='bg-red-700 rounded-lg p-3 uppercase cursor-pointer'>Sign out</span>
        </div>
      </div>
      {bookings && bookings.length > 0 && 
        <div className='flex flex-col mt-10 mb-10 w-[80%] self-center'>
          <h1 className='text-white text-3xl self-center mb-10'>Your All Bookings</h1>
          {bookings.map((booking) => (
            <div className='rounded p-5 mb-5' style={{background:'rgba(229, 228, 226, 0.1)'}}>
              <div className='flex flex-col bg-transparent'>
                <div className='flex bg-transparent w-full'>
                  <img style={{width:'100%', height:'30vw'}} className='rounded object-cover' src={booking.hotelImage}/>
                </div>
                <div className='bg-transparent ml-10 flex flex-col flex-1'>
                  <h1 className='bg-transparent text-white text-md md:text-xl lg:text-2xl xl:text-4xl capitalize'>{booking.hotelName}</h1>
                  <div className='flex gap-3 items-center bg-transparent'>
                    <h1 className='bg-transparent md:text-md lg:text-lg xl:text-xl text-white mt-10'>Booking created at:</h1>
                    <h1 className='bg-gray-500 p-1 rounded-lg md:text-md lg:text-lg xl:text-xl text-white mt-10'>{new Date(booking.createdAt).toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit'})}</h1>
                  </div>
                  {booking.assignedRoom ? (
                    <div className='flex justify-between bg-transparent'>
                      <div className='flex items-center bg-transparent gap-3 mt-3'>
                        <h1 className='bg-transparent md:text-md lg:text-lg xl:text-xl text-white'>Booking Status:</h1>
                        <h1 className='bg-transparent text-green-500 md:text-xl lg:text-2xl xl:text-3xl'>Booking Confirmed</h1>
                      </div>
                      <div className='bg-cyan-700 p-3 rounded-lg flex items-center gap-3' onClick={openQRPopup}>
                        <button className='text-white md:text-lg lg:text-xl xl:text-2xl'>Your QR Key</button>
                        <MdQrCode2 className='bg-transparent' color='white' size={'3vw'}/>
                      </div>
                      {showQRPopup && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white p-6 rounded-lg flex flex-col gap-5">
                            <h1 className='text-dark bg-transparent text-md md:text-lg lg:text-xl xl:text-2xl'>This is your key for your room</h1>
                            <QRCodeSVG value={booking.qrCode} style={{width:'20vw', height:'20vw'}}/>
                            <button className="bg-cyan-700 text-white px-4 py-2 rounded-md mt-4" onClick={() => setShowQRPopup(false)}>Close</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex items-center bg-transparent gap-3 mt-3'>
                      <h1 className='bg-transparent md:text-md lg:text-lg xl:text-xl text-white'>Booking Status:</h1>
                      <h1 className='bg-transparent text-gray-500 md:text-xl lg:text-2xl xl:text-3xl'>Waithing To Confirm</h1>
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
