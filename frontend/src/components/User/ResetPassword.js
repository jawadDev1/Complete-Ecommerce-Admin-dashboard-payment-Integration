import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { clearErrors, clearSuccess, resetPasswordAsync } from '../../features/User/userSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    const { pending, success, error } = useSelector(state => state.user);

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function resetPassword(e){
        e.preventDefault();
        dispatch(resetPasswordAsync({newPassword, confirmPassword, token}));
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
            dispatch(showAlert({message: `Password is reset Successfully`, type: 'success'}))
            dispatch(clearSuccess())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            navigate('/account')
        }

        // eslint-disable-next-line
    }, [error, dispatch, success])

  return (
    <>
    {pending && <Loader />}
    {!pending && <div className="container md:my-3 flex justify-center items-center md:h-[70vh] h-[70vh]">
        <div className="md:w-[40%] w-[80%] bg-white md:mt-5 mb-12 md:p-7 p-3 md:h-[90%] h-[70%] shadow-lg relative overflow-hidden">

            <h2 className='text-center opacity-90 text-2xl'>Change Password</h2>

            <form className="signup mt-7 gap-7 w-[100%] flex flex-col items-center  h-full " id='signup' onSubmit={resetPassword}>
                
                <div className="relative flex items-center w-full">
                    <span className='absolute mx-2 text-gray-900'><LockOpenIcon /></span>
                    <input type="password" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='New Password' name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="relative flex items-center w-full">
                    <span className='absolute mx-2 text-gray-900'><LockIcon /></span>
                    <input type="password" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Change</button>
            </form>
        </div>

    </div>}

</>
  )
}

export default ResetPassword