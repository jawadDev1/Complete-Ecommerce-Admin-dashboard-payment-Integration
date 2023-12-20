import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
import { getAllUsersAsync,  clearErrors, clearSuccess, deleteUserAsync } from '../../features/User/userSlice';

function AllUsers() {
    const dispatch = useDispatch();

    const { allUsers, error, pending, success } = useSelector(state => state.user);


    const deleteUser = (id) => {
        dispatch(deleteUserAsync(id))
    }




    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 70, flex: 0.5 },
        { field: 'role', headerName: 'Role', minWidth: 70, type: "number", flex: 0.3, cellClassName: (params) => {
           return  (
            (params.row.role) === 'admin' ? 'text-green-600': ''
           ) 
        } },
        {
            field: 'actions', headerName: 'Actions', minWdth: 120, flex: 0.5, sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex md:gap-8'>
                        <Link to={`/admin/users/${params.row.id}`} className='hover:text-red-600'>
                            <EditIcon />
                        </Link>

                        <button onClick={() => deleteUser(params.row.id)} className='hover:text-red-600'>
                            <DeleteIcon />
                        </button>
                    </div>
                )
            }

        },
    ]

    const rows = [];

    allUsers && allUsers.forEach(user => {
        rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    })

    useEffect(() => {
        if (error) {
            dispatch(showAlert({ message: error.message, type: 'error' }))
            dispatch(clearErrors())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)

            return;
        }
        
        if (success) {
            dispatch(showAlert({ message: success, type: 'success' }))
            dispatch(clearSuccess())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
        }
        

        dispatch(getAllUsersAsync());

    }, [dispatch, error, success])


    return (
        <>
            <div className="container flex md:flex-row flex-col gap-3">
                <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
                    <SideBar />
                </div>
                <div className="products-container md:w-[80%] w-full p-3">
                    <h2 className='text-2xl font-medium text-center'>All Users</h2>
                    <div className="list overflow-auto">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            disableSelectionOnClick
                            style={{ overflow: 'scroll' }}
                            autoHeight
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllUsers