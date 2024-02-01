import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/hotel/hotelSlice.js';

export default function SignInHotel() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.hotel)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
        ...formData,  // spred operatior da prati promene svih polja i da ih pamti cak i kada nisu u fokusu 
        [e.target.id]: e.target.value,  // preko id pratimo svaki input i dodeljujemo mu vrednost
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // preventing refreshing the page when we submite a form
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signinHotel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });  
      const data = await res.json();  // convert the response we get to JSON
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/hotel-profile');
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
    
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center text-white font-semibold my-7'>Sign In Hotel</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type='email' placeholder='Email' className='border p-3 rounded-lg text-white' id='email'/>
        <input onChange={handleChange} type='password' placeholder='Password' className='border p-3 rounded-lg text-white' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'> 
        <p className='text-white'>Dont have an account?</p>
        <Link to={"/sign-up-hotel"}>
          <span className='text-blue-700'>Sign Up Hotel</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
