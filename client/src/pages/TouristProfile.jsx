import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonSharp, IoBedSharp } from "react-icons/io5";
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/account/accountSlice';

export default function Profile() {
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
    </div>
  )
}
