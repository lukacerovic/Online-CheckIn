import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/account/accountSlice';

export default function HotelProfile() {
  const currentUser = useSelector((state) => state.account);
  const currentUserData = currentUser.currentAccount

  const dispatch = useDispatch();
  const navigation = useNavigate();

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
      <h1 className='text-3xl text-white font-semibold text-center my-10'>Profile</h1>
      <form className='self-center w-full'>
        <div className='flex flex-col'>
          <img className='rounded shadow h-30 w-40 object-cover cursor-pointer self-center mt-2' src={currentUserData.logo} alt="profile" style={{position:'absolute',}}/>
          <img src='https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D' style={{height:'60vh'}}/>
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
      <div className='flex flex-col mt-10 ml-10 mb-10'>
        <h1 className='text-white text-3xl self-center mb-10'>Your All Listings</h1>
        <div className='flex rounded p-5' style={{background:'rgba(229, 228, 226, 0.1)'}}>
          <img style={{width:'30%'}} className='rounded' src='https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906'/>
          <div className='ml-3'>
            <img style={{height:'19vh'}} className='rounded mb-3' src='https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906'/>
            <img style={{height:'19vh'}} className='rounded' src='https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906'/>
          </div>
          <div className='bg-transparent ml-10 flex-1'>
            <h1 className='bg-transparent text-white text-2xl'>Junior Large Bedroom</h1>
            <p className='bg-transparent text-white pt-3'>Serbia | Belgrade | Svetozara Miletica 24</p>   
            <div className='flex bg-transparent gap-6 mt-3'>
              <span className='flex items-center bg-transparent gap-2'>
                <IoPersonSharp color='white' className='bg-transparent' size={30}/>
                <p className='bg-transparent text-white'>2 persons</p>
              </span>
              <span className='flex items-center bg-transparent gap-2'>
                <IoBedSharp color='white' className='bg-transparent' size={30} />
                <p className='bg-transparent text-white'>1 Queen's size</p>
              </span>
            </div> 
            <h1 className='bg-transparent text-2xl text-white mt-3'>Price: 120$ / night</h1>
            <h1 className='bg-transparent text-xl text-white mt-10'>Number of rooms: 135</h1>
            <h1 className='bg-transparent text-xl text-white mt-1'>Number of booked rooms: 97</h1>
          </div>  
          <div className='self-end bg-transparent mr-3' style={{float:'left'}}>
            <button className='bg-cyan-700 p-3 text-white text-2xl rounded-lg'>View bookings</button>
          </div>      
        </div>
      </div>
    </div>
  )
}
