import React, { useState } from 'react'
import logo from '../../images/logo.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom'
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux'


function Header() {
    const { user, isAuthenticated } = useSelector(state => state.user)
    const [keyword, setKeyword] = useState('');

    const showHideMenu = () => {
        document.getElementById('nav').classList.toggle('showHideMenu');
    }

    const showSearch = () => {
        document.getElementById('search').classList.toggle('show-search');
    }


    return (
        <>

            <header className="text-gray-400 bg-white body-font shadow-lg relative md:sticky top-0 z-50">
                <div className=" flex justify-between items-center px-2 py-3  overflow-hidden">
                    <Link to='/' className="flex title-font font-medium items-center text-white  md:mb-0">
                        <img src={logo} className='w-36' alt="ecommerce" />
                    </Link>

                    <nav className="z-40 md:z-20 bg-gray-200 h-[100vh] md:h-auto md:bg-white flex flex-col md:flex-row md:items-center right-0 -top-[100vh] md:top-0 absolute md:static  px-2 transition-all duration-500 " id='nav'>
                        <i className='mx-2 text-gray-900 cursor-pointer hover:text-red-600 font-medium md:hidden text-3xl' onClick={showHideMenu}><CloseIcon /></i>

                        <ul className='md:mr-auto md:ml-4 md:py-1 md:pl-4 flex md:flex-wrap flex-col md:flex-row  md:items-center md:text-base md:justify-center gap-4  text-xl  p-4 '>
                            <Link to='/' className="mr-5 text-black hover:text-red-600 transition-all duration-150">Home</Link>
                            <Link to='/products' className="mr-5 text-black hover:text-red-600 transition-all duration-150">Products</Link>
                            <Link to='/contact' className="mr-5 text-black hover:text-red-600 transition-all duration-150">Contact</Link>
                            <Link to='/about' className="mr-5 text-black hover:text-red-600 transition-all duration-150">About</Link>
                        </ul>
                    </nav>

                    <div className="flex items-center">
                        <Link to={'/cart'} className='mx-2 text-gray-900 cursor-pointer hover:text-red-600 font-medium'><LocalMallIcon /></Link>
                        <i className='mx-2 text-gray-900 cursor-pointer hover:text-red-600 text-2xl font-medium' onClick={showSearch}><SearchIcon /></i>
                        <i className='md:hidden text-gray-900 cursor-pointer hover:text-red-600 font-medium mx-2' onClick={showHideMenu}><MenuIcon /></i>

                        {!isAuthenticated && <Link to={'/login'} className='mx-2 text-gray-900 cursor-pointer hover:text-red-600 font-medium'><AccountBoxIcon /></Link>}

                        {isAuthenticated && <i className='md:mx-5 ml-10 text-gray-900 cursor-pointer hover:text-red-600 text-2xl font-medium md:mb-5'> <UserOptions user={user}/></i>}

                        
                    
                    
                    </div>
                    
                </div>
            </header>
            <div className='search-input absolute right-12  -top-16  bg-gray-800 z-20' id='search'>
                <input type="text" value={keyword} className='p-3' placeholder='Search Product...' onChange={(e) => setKeyword(e.target.value)} />
                <Link to={`/products/${keyword.trim()}`} className={`p-2 text-white cursor-pointer ${(keyword.trim().length === 0 ? 'pointer-events-none' : '')}`}><SearchIcon /></Link>
            </div>

        </>
    )
}

export default Header