import { useEffect, useState } from 'react';
import IOS_tv_logo from '../assets/IOS_tv_logo.png';
import UserIcon from '../assets/UserIcon.jpeg';
import { href, Link, NavLink, useNavigate } from 'react-router-dom';
import { navigations } from './navigation';

const Header = () => {
    
    const [searchInput, setSearchInput] = useState('')

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(searchInput) {
            navigate(`/Search?q=${searchInput}`)
        }
    }, [searchInput])

    const handleSubmit =(e) =>{
        e.preventDefault()
    }

    return ( 
        <header className="fixed top-0 w-full h-16 bg-purple-900 bg-opacity-75">
            <div className="container mx-auto px-2 flex items-center">
                <Link to={'/'}>
                    <img src={IOS_tv_logo} alt="logo" width={100} />
                </Link>

                <nav className='hidden lg:flex items-center gap-2 ml-3.5 pl-3'>
                    {navigations.map((nav, index) => (
                        <div key={nav.label}>
                            <NavLink to={nav.href} className={'px-2 text-neutral-100 hover:text-neutral-400'}>{nav.label}</NavLink>
                        </div>
                    ))}
                </nav>

                <div className='ml-auto flex gap-4 items-center'>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" 
                            placeholder='Search Movies...'
                            className='hidden lg:inline-block items-center bg-transparent text-neutral-50 px-3 border-none outline-none '
                            onChange={(e)=> setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button>

                        </button>
                    </form>
                    <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img src={UserIcon} alt="UserIcon"  />
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;