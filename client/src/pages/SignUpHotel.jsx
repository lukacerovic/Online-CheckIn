import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpHotel() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value // preko id-a svakog inputa pratimo promene
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
        const res = await fetch('/api/auth/signupHotel', 
        {
            
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            
        });
        
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);  
        setError(null);
        navigate('/sign-in-hotel');
    } catch (error) {
        setLoading(false);
        setError(error.message);
    }
    
  };

  return (
    <div className='p-3 max-w-lg mx-auto text-white'>
      <h1 className='text-3xl text-white text-center font-semibold my-7'>Sign Up Hotel</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type='hotelName' placeholder='Hotel Name' className='border p-3 rounded-lg' id='hotelName'/> 
        <input onChange={handleChange} type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input onChange={handleChange} type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'> 
        <p className='text-white'>Already have an account?</p>
        <Link to={"/sign-in-hotel"}>
          <span className='text-blue-700'>Sign In Hotel</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}