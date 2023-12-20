import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearSuccess, getUserDetailsAsync, updateUserAsync } from '../../features/User/userSlice';
import { useParams } from 'react-router-dom';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';


function UpdateUser() {
    const {id} = useParams();
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        role: ''
    })

    const dispatch = useDispatch();
    const { userDetails, error, success } = useSelector(state => state.user);

    function handleUpdateUser(e) {
        e.preventDefault();

        dispatch(updateUserAsync({id, updatedUser}));
    }

    function handleUserChange(e) {
        e.preventDefault();

        setUpdatedUser({
            ...updatedUser, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (error) {
            dispatch(showAlert({ message: error.message, type: 'error' }))
            dispatch(clearErrors())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            return;
        }

        if (success?.message) {
            dispatch(showAlert({ message: success, type: 'success' }))
            dispatch(clearSuccess())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
        }

        if(!userDetails || userDetails._id !== id) {
            dispatch(getUserDetailsAsync(id));
        }
        
         setUpdatedUser({
            name: userDetails?.name,
            email: userDetails?.email,
            role: userDetails?.role
        })


    }, [dispatch, error, success, id])

    return (
        <>
        <h2 className='my-5 text-2xl font-medium text-center'>Update User</h2>
            <form className="signup mt-7 gap-7 md:w-[40%] w-[70%] mx-auto flex flex-col items-center h-full bg-white shadow-md p-5" id='signup' onSubmit={handleUpdateUser}>
                <div className="name relative flex items-center w-full">
                    <span className='absolute mx-2 text-gray-900'><PersonIcon /></span>
                    <input type="text" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-3' placeholder='Name' name='name' value={updatedUser.name} onChange={handleUserChange} />
                </div>
                <div className="email relative flex items-center w-full">
                    <span className='absolute mx-2 text-gray-900'><EmailIcon /></span>
                    <input type="email" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-3' placeholder='Email' name='email' value={updatedUser.email} onChange={handleUserChange} />
                </div>
                <div className="role relative flex items-center w-full">
                    <span className='absolute mx-2 text-gray-900'><ManageAccountsIcon /></span>
                    <select type="text" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-3' placeholder='Role' name='role' value={updatedUser.role} onChange={handleUserChange} >
                        <option>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Update</button>
            </form>
        </>
    )
}

export default UpdateUser