import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/account/accountSlice.js';

export default function SignInHotel() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.account)
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
      const res = await fetch('/api/auth/signinTourist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });  
      const data = await res.json();  // convert the response we get to JSON
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      
      navigate('/tourist-profile');
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
    
  };

  return (
    <div className='flex flex-col'>
      <div className='self-center' style={{width:'60%', marginTop:'10vw'}}>
        <h1 className='text-2xl md:text-4xl lg:ext-5xl xl:text-6xl text-center text-white font-semibold my-7'>Sign In Tourist</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input onChange={handleChange} type='email' placeholder='Email' className='text-lg md:text-xl lg:ext-3xl xl:text-3xl border p-3 rounded-lg text-white' id='email'/>
          <input onChange={handleChange} type='password' placeholder='Password' className='text-lg md:text-xl lg:ext-3xl xl:text-3xl border p-3 rounded-lg text-white' id='password'/>
          <button className='text-lg md:text-xl lg:ext-3xl xl:text-3xl bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className='flex gap-2 mt-5'> 
          <p className='text-white text-lg md:text-xl lg:ext-3xl xl:text-3xl'>Dont have an account?</p>
          <Link to={"/sign-up-tourist"}>
            <span className='text-blue-500 text-lg md:text-xl lg:ext-3xl xl:text-3xl'>Sign Up Tourist</span>
          </Link>
        </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      
    </div>
  )
}
