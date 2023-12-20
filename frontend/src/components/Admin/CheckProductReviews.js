import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, getAllProductsAsync, clearErrors, clearSuccess, getProductReviewsAsync, deleteProductReviewAsync } from '../../features/Product/productSlice';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';

function CheckProductReviews() {
    const dispatch = useDispatch();
    const [productId, setProductId] = useState('');
    const { reviews, error, pending, success } = useSelector(state => state.products);


    const deleteProduct = (reviewId) => {
        dispatch(deleteProductReviewAsync({productId, reviewId}))
    }

    function checkReviews(e){
        e.preventDefault();
        dispatch(getProductReviewsAsync(productId));
    }


    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 100, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 0.8 },
        { field: 'comment', headerName: 'Comment', minWidth: 70, flex: 1 },
        { field: 'rating', headerName: 'Rating', minWidth: 70, type: "number", flex: 0.3 },
        {
            field: 'actions', headerName: 'Actions', minWdth: 120, flex: 0.5, type: "number" ,sortable: false,
            renderCell: (params) => {
                return (

                    <button onClick={() => deleteProduct(params.row.id)} className='hover:text-red-600'>
                        <DeleteIcon />
                    </button>
                )
            }

        },
    ]

    const rows = [];

    reviews && reviews.forEach(review => {
        rows.push({
            id: review._id,
            name: review.name,
            comment: review.comment,
            rating: review.rating
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


    }, [dispatch, error, success])


    return (
        <>

            <div className="container flex md:flex-row flex-col gap-3">
                <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
                    <SideBar />
                </div>
                <div className="products-container md:w-[80%] w-full p-3">
                    <h2 className='text-2xl font-medium text-center'>Check Product Reviews</h2>
                    
                        <form className="search-product bg-white md:w-[50%] p-3 shadow-md flex flex-col items-center gap-6 my-6 mx-auto" onSubmit={checkReviews}>
                            <input type="text" className='w-[90%] px-3 py-3 border-2' placeholder='Enter Product ID' value={productId} onChange={(e) => setProductId(e.target.value)}/>
                            <button className='block w-[90%] px-3 py-3 text-white bg-red-600 hover:bg-red-500 font-lg' type='submit'>Search</button>

                        </form>
                    
                    { reviews.length === 0? <h3 className='text-xl font-medium mx-5 my-8'>No reviews </h3> :<div className="list overflow-auto">
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
                    </div>}
                </div>
            </div>
        </>
    )
}

export default CheckProductReviews