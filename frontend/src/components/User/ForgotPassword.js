import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { forgotPasswordAsync, clearErrors, clearSuccess } from '../../features/User/userSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';



function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const {pending, error, success} = useSelector(state => state.user);

    function handleForgotPassword(e){
        e.preventDefault();
        dispatch(forgotPasswordAsync(email));
    }

    useEffect(() => {
      if (error) {
        dispatch(showAlert({message: error.message, type: 'error'}))
        dispatch(clearErrors())
        setTimeout(()=> {
          dispatch(clearAlert());
      }, 100)
        return;
    }

    if (success) {
        dispatch(showAlert({message: `Email is send to ${email}`, type: 'success'}))
        dispatch(clearSuccess())
        setTimeout(()=> {
          dispatch(clearAlert());
      }, 100)
        
    }
        // eslint-disable-next-line
    }, [error, dispatch, success])

  return (
    <>
     {pending && <Loader />}
      {!pending && <div className="container md:my-3 flex justify-center items-center md:h-[70vh] h-[60vh]">
        <div className='md:w-[40%] w-[60%] bg-white md:mt-5 mb-12 md:p-7 p-3 md:h-[90%] h-[70%] shadow-lg relative overflow-hidden'>
      <form className="login mt-7  flex gap-7 flex-col items-center" id='login' onSubmit={handleForgotPassword}>
        <h2 className='text-center text-2xl opacity-90' >Confirm Email</h2>
            <div className="email my-4 relative flex items-center w-full">
              <span className='absolute mx-2 text-gray-900'><EmailIcon /></span>
              <input type="email" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
           
            <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Send</button>

          </form>
          </div>
          </div>}
    
    </>
  )
}

export default ForgotPassword