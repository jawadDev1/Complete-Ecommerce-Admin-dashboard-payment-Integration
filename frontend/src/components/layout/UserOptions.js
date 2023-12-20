import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import { logoutAsync } from '../../features/User/userSlice';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../features/Alert/alertSlice';

function UserOptions({user}) {
   const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    let options = [
        { icon: <span className='text-black'><PersonIcon /></span>, name: 'Account', func: account },
        { icon: <span className='text-black'><ListAltIcon /></span>, name: 'Orders', func: orders },
        { icon: <span className='text-black'><LogoutIcon /></span>, name: 'Logout', func: logout },
    ]

    if (user.role === 'admin') {
        options.unshift({ icon: <span className='text-black'><DashboardIcon /></span>, name: 'Dashboard', func: dashboard },)
    }

    function account(){
        navigate('/account')
    }

    function orders(){
        navigate('/orders/myorders')
    }

    function logout(){
        dispatch(logoutAsync());
        dispatch(showAlert(['Success', 'Logout Successfully', 'block', 'success']));

        setTimeout(()=>{
            dispatch(showAlert(['', '', 'hidden', 'error']));
        }, 2000)
        navigate('/')
    }
    
    function dashboard(){
        navigate('/admin/dashboard')
    }

    return (
        <>
        <Backdrop
         sx={{ color: '#fff', zIndex: 30}}
         open={open}
        />
        <div className='user-options'>
            <SpeedDial
                ariaLabel="User Options"
                icon={<img src={user.avatar.url} className='rounded-full w-10 h-10 object-cover object-center' alt='profile'/>}
                direction='down'
                className='userOptions rounded-full'
                sx={{ position: 'absolute', top: 13, right: 1, zIndex: 40}}
                onClose={()=> setOpen(false)}
                onOpen={()=> setOpen(true)}
                open={open}
            >
                {options.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                    />
                ))}
            </SpeedDial>
            </div>
        </>
    )
}

export default UserOptions