import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader';
import { updateProfileAsync } from '../../features/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearSuccess, clearErrors } from '../../features/User/userSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';

function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, pending, success, error } = useSelector(state => state.user)

    const [name, setName] = useState(user.name)
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);


    function handleChange(e) {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
                setAvatarPreview(reader.result)
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    }

    function updateProfile(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name)
        formData.append('avatar', avatar)

        dispatch(updateProfileAsync(formData));

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
            dispatch(showAlert({message: `Profile is updated Successfully`, type: 'success'}))
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
            {isAuthenticated && !pending && <div className="container md:my-3 flex justify-center items-center md:h-[100vh] h-[85vh]">
                <div className="md:w-[40%] w-[80%] bg-white md:mt-5 mb-12 md:p-7 p-3 md:h-[90%] h-[70%] shadow-lg relative overflow-hidden">

                    <h2 className='text-center opacity-90 text-2xl'>Update Profile</h2>

                    <form className="signup mt-7 gap-7 w-[90%] flex flex-col items-center  h-full " id='signup' onSubmit={updateProfile}>
                        <div className="name relative flex items-center w-full">
                            <span className='absolute mx-2 text-gray-900'><PersonIcon /></span>
                            <input type="text" required className='border focus:border-gray-950 border-gray-500 outline-none w-full px-9 py-2' placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>


                        <div className="avatar relative flex items-center w-full">

                            <span className='absolute text-gray-900'><img src={avatarPreview} alt="profile" className='w-10 h-10  rounded-full object-cover object-center' /></span>

                            <input type="file" className='mx-12' name='avatar' onChange={handleChange} id='file' />
                        </div>
                        <button className="w-40 px-5 py-2 text-white bg-red-600 outline-none my-5 hover:bg-red-500" type='submit'>Update</button>
                    </form>
                </div>

            </div>}

        </>
    )
}

export default UpdateProfile