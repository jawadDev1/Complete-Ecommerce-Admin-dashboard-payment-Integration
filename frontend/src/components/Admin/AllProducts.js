import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, getAllProductsAsync, clearErrors, clearSuccess } from '../../features/Product/productSlice';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';

function AllProducts() {
    const dispatch = useDispatch();

    const { allProducts, error, pending, success } = useSelector(state => state.products);


    const deleteProduct = (id) => {

        dispatch(deleteProductAsync(id));
    }




    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
        { field: 'stock', headerName: 'Stock', minWidth: 70, type: "number", flex: 0.3 },
        { field: 'price', headerName: 'Price', minWidth: 70, type: "number", flex: 0.3 },
        {
            field: 'actions', headerName: 'Actions', minWdth: 120, flex: 0.5, sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex md:gap-8'>
                        <Link to={`/admin/products/${params.row.id}`} className='hover:text-red-600'>
                            <EditIcon />
                        </Link>

                        <button onClick={() => deleteProduct(params.row.id)} className='hover:text-red-600'>
                            <DeleteIcon />
                        </button>
                    </div>
                )
            }

        },
    ]

    const rows = [];

    allProducts && allProducts.forEach(product => {
        rows.push({
            id: product._id,
            name: product.name,
            stock: product.stock,
            price: product.price
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
            dispatch(showAlert({ message: 'Product is Deleted Successfully', type: 'success' }))
            dispatch(clearSuccess());
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
        }

        dispatch(getAllProductsAsync());

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

export default AllProducts