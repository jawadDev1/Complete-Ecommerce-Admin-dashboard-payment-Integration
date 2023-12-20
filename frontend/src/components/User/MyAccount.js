import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
import { clearErrors } from '../../features/User/userSlice';

function MyAccount() {
  const dispatch = useDispatch();
  const { user, pending, isAuthenticated, error } = useSelector(state => state.user);
  const { name, email, avatar, createdAt } = user;

  useEffect(() => {
    if (error) {
      dispatch(showAlert({message: error.message, type: 'error'}))
      dispatch(clearErrors())
      setTimeout(()=> {
        dispatch(clearAlert());
    }, 100)
      return;
  }

    // eslint-disable-next-line
  }, [error, dispatch])
  

  return (
    <>
      {pending && <Loader />}
      {isAuthenticated && !pending && <div className="container flex h-screen p-5 md:flex-row flex-col">
        <div className="left md:w-1/2 flex justify-around items-center flex-col gap-5">
          <img src={avatar.url} alt="Profile" className='rounded-full w-60 h-60 object-cover object-center ' />
          <Link to="/updateprofile" className='bg-red-600 w-60 px-4 py-2 text-center text-white '>Edit Profile</Link>
        </div>
        <div className="right md:w-1/2 flex flex-col md:justify-between w-full gap-8 p-4 my-4">
          <div className="">
            <h4 className='font-medium text-xl'>Name</h4>
            <h3 className='mx-2 opacity-90 ' >{name}</h3>
          </div>
          <div className="">
            <h4 className='font-medium text-xl'>Email</h4>
            <h3 className='mx-2 opacity-90'>{email}</h3>
          </div>
          <div className="">
            <h4 className='font-medium text-xl'>Joined On</h4>
            <h3 className='mx-2 opacity-90'>{createdAt.substr(0, 10)}</h3>
          </div>
          <div className='flex gap-4 flex-col'>
            <Link to="/orders/myorders" className='bg-red-600 w-60 px-4 py-2 text-center text-white'>My Orders</Link>
            <Link to="/changepassword" className='bg-red-600 w-60 px-4 py-2 text-center text-white'>Change Password</Link>
          </div>
        </div>
      </div>}

    </>
  )
}

export default MyAccount