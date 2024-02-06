import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currentUser = useSelector(state => state.account);
  const currentUserData = currentUser.currentAccount;

  return (
    <header className='bg-slate-200 shadow-md w-full'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/hotel-listings'>
                <img src="/images/logo2.png" alt='logo' className="h-20" />
            </Link>
            <ul className='flex gap-4 text-white'>
                <Link to='/hotel-listings'>
                    <li className='hidden sm:inline hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline'>About</li>
                </Link>
                {/* Ako korisnik nije ulogovan prikazi sign in dugme, u suprotnom sliku avatara */}
                <Link to={currentUserData && currentUserData.type === 'hotel' ? '/hotel-profile' : '/tourist-profile'}>
                    {currentUserData ? (
                        <>
                            {currentUserData.type === 'hotel' ? (
                                <img className="rounded-full h-7 w-7 object-cover" src={currentUserData.logo} alt="" />
                            ) : (
                                <img className="rounded-full h-7 w-7 object-cover" src={currentUserData.profileImage} alt="" />
                            )}
                        </>
                    ) : (
                        <li className='hover:underline'>SignIn</li>
                    )}
                </Link>

                
            </ul>
        </div>
        
    </header>
  )
}