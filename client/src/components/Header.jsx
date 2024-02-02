import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currentUser = useSelector(state => state.account);
  const currentUserData = currentUser.currentAccount;

  console.log('Header trenutnoi korisnik',currentUser);
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/hotel-listing'>
                <img src="/images/logo2.png" alt='logo' className="h-20" />
            </Link>
            <ul className='flex gap-4 text-white'>
                <Link to='/hotel-listing'>
                    <li className='hidden sm:inline hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline'>About</li>
                </Link>
                {/* Ako korisnik nije ulogovan prikazi sign in dugme, u suprotnom sliku avatara */}
                <Link to={currentUserData && currentUserData.type === 'hotel' ? '/tourist-profile' : '/hotel-profile'}>
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