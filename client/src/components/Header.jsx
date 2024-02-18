import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currentUser = useSelector(state => state.account);
  const currentUserData = currentUser.currentAccount;

  return (
    <header className='bg-slate-200 shadow-md w-full'>
        <div className='flex justify-between items-center px-20'>
            <Link to='/hotel-listings'>
                <img src="/images/logo2.png" alt='logo' style={{width:'10vw'}} />
            </Link>
            <ul className='flex gap-10 text-white items-center'>
                <Link to='/hotel-listings'>
                    <li className='hidden sm:inline hover:underline' style={{fontSize:'1vw'}}>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline' style={{fontSize:'1vw'}}>About</li>
                </Link>
                {/* Ako korisnik nije ulogovan prikazi sign in dugme, u suprotnom sliku avatara */}
                <Link to={currentUserData && currentUserData.type === 'hotel' ? '/hotel-profile' : '/tourist-profile'}>
                    {currentUserData ? (
                        <>
                            {currentUserData.type === 'hotel' ? (
                                <img className="rounded-full object-cover" style={{height:'5vw'}} src={currentUserData.logo} alt="" />
                            ) : (
                                <img className="rounded-full object-cover" style={{height:'5vw'}} src={currentUserData.profileImage} alt="" />
                            )}
                        </>
                    ) : (
                        <li className='hover:underline' style={{fontSize:'1vw'}}>SignIn</li>
                    )}
                </Link>

                
            </ul>
        </div>
        
    </header>
  )
}