import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../Loader';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearSuccess, loginAsync, signupAsync } from '../../features/User/userSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';


function LoginAndSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const { error, pending, isAuthenticated } = useSelector(state => state.user);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  //for signup
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  

  function handleSignupChange(e) {

    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      };

      reader.readAsDataURL(e.target.files[0]);

    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }

  }

  // login
  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginAsync({ loginEmail, loginPassword }))
    
  }

  // signup
  function handleSignup(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('avatar', avatar)

    dispatch(signupAsync(formData));
  }


  // swap the login and signup form
  const scrollTheBar = (check) => {
    if (check === 'signup') {
      document.getElementById('scroll-bar').classList.add('scroll-the-bar')

      document.getElementById('signup').classList.remove('hide-form')
      document.getElementById('login').classList.add('hide-form')

    } else if (check === 'login') {
      document.getElementById('scroll-bar').classList.remove('scroll-the-bar')

      document.getElementById('login').classList.remove('hide-form')
      document.getElementById('signup').classList.add('hide-form')
    }
  }

  const redirect = location.search ? '/order/shipping': '/account';

  
  useEffect(() => {
    if (error) {
      dispatch(showAlert({message: error.message, type: 'error'}))
      dispatch(clearErrors());
      setTimeout(()=> {
        dispatch(clearAlert());
    }, 100)
      return;
  }

    if(isAuthenticated){
      navigate(redirect)
      dispatch(clearSuccess());
    }


    // eslint-disable-next-line

  }, [error, isAuthenticated, dispatch, navigate, redirect])


  return (
    <>
      
      {pending && <Loader />}
      {!pending && <div className="container md:my-3 flex justify-center items-center md:h-[100vh] h-[85vh]">
        <div className='md:w-[40%] w-[80%] bg-white md:mt-5 mb-12 md:p-7 p-3 md:h-[90%] h-[70%] shadow-lg relative overflow-hidden'>

          <div className='flex justify-around gap-4'>
            <h2 className='cursor-pointer' onClick={() => scrollTheBar('login')}>Login</h2>
            <h2 className='cursor-pointer' onClick={() => scrollTheBar('signup')}>Signup</h2>
          </div>
          <div className="scroll h-[.15rem] relative ">
            <span className=' bg-red-600 w-[50%] h-full translate-x-[0%] absolute transition-all duration-300' id='scroll-bar'></span>
          </div>

          {/* SignUP  */}
          <form className="signup mt-7 gap-7 w-[90%] flex flex-col items-center absolute h-full  hide-form transition-all duration-300" id='signup' onSubmit={handleSignup}>
            <div className="name relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><PersonIcon /></span>
              <input type="text" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Name' name='name' value={user.name} onChange={handleSignupChange} />
            </div>
            <div className="email relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><EmailIcon /></span>
              <input type="email" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Email' name='email' value={user.email} onChange={handleSignupChange} />
            </div>
            <div className="password relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><HttpsIcon /></span>
              <input type="password" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Password' name='password' value={user.password} onChange={handleSignupChange} />
            </div>
            <div className="avatar relative flex items-center w-full">

              <span className='absolute text-gray-900'><img src={avatarPreview} alt="profile" className='w-10 h-10  rounded-full object-cover object-center' /></span>

              <input type="file" className='mx-12' name='avatar' onChange={handleSignupChange} id='file' required />
            </div>
            <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Signup</button>
          </form>



          {/* Login  */}
          <form className="login mt-7 w-[90%] flex gap-7 flex-col items-center absolute transition-all duration-300" id='login' onSubmit={handleLogin}>
            <div className="email my-4 relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><EmailIcon /></span>
              <input type="email" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="password relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><HttpsIcon /></span>
              <input type="password" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <div className='relative w-full'>
              <Link to='/forgotpassword' className="right-0 absolute underline text-gray-700 cursor-pointer hover:text-gray-900">forget password?</Link>
            </div>
            <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Login</button>

          </form>



        </div>
      </div>}

    </>
  )
}

export default LoginAndSignup