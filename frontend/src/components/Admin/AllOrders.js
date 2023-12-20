import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderAsync, getAllOrdersAsync, clearErrors, clearSuccess } from '../../features/Order/orderSlice';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';

function AllOrders() {
    const dispatch = useDispatch();

    const { allOrders, error, pending, success } = useSelector(state => state.order);


    const deleteOrder = (id) => {

        dispatch(deleteOrderAsync(id));
    }




    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
        { field: 'status', headerName: 'Status', minWidth: 100, flex: 0.8 },
        { field: 'items', headerName: 'Items', minWidth: 60, type: "number", flex: 0.3 },
        { field: 'amount', headerName: 'Amount', minWidth: 80, type: "number", flex: 0.3 },
        {
            field: 'actions', headerName: 'Actions', minWdth: 120, flex: 0.5, sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex md:gap-8'>
                        <Link to={`/admin/orders/${params.row.id}`} className='hover:text-red-600'>
                            <EditIcon />
                        </Link>

                        <button onClick={() => deleteOrder(params.row.id)} className='hover:text-red-600'>
                            <DeleteIcon />
                        </button>
                    </div>
                )
            }

        },
    ]

    const rows = [];

    allOrders && allOrders.forEach(order => {
        rows.push({
            id: order._id,
            name: order.orderItems.map(item => (
                `${item.name} ,`
            )),
            status: order.orderStatus,
            items: order.orderItems.length,
            amount: order.totalPrice
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
            dispatch(showAlert({ message: 'Products is deleted Successfully', type: 'success' }))
            dispatch(clearSuccess())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
        }

        dispatch(getAllOrdersAsync());

    }, [dispatch, error, success])


    return (
        <>
            <div className="container flex md:flex-row flex-col gap-3">
                <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
                    <SideBar />
                </div>
                <div className="products-container md:w-[80%] w-full p-3">
                    <h2 className='text-2xl font-medium text-center'>All Products</h2>
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

export default AllOrders