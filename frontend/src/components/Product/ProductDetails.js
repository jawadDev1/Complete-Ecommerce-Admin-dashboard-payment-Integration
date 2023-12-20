import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// components imports
import Loader from '../Loader';
import RatingStar from './RatingStar';
import ReviewCard from './ReviewCard';
import ImageCarousel from './ImageCarousel';
// redux imports 
import { useSelector, useDispatch } from 'react-redux'
import { addReviewAsync, clearErrors, clearSuccess, getProductDetailsAsync } from '../../features/Product/productSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
import { addToCart } from '../../features/Cart/cartSlice';

// mui dialog imports

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';

function ProductDetails() {
    const { productDetails, error, pending, success } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitReview = () => {
        setOpen(false);
        let reviewForm = new FormData();
        reviewForm.set('rating', rating)
        reviewForm.set('comment', comment)
        reviewForm.set('id', id)

        dispatch(addReviewAsync(reviewForm));
    }

    function increaseQuantity() {
        if (quantity >= productDetails.stock) return;
        setQuantity(quantity + 1)
    }

    function decreaseQuantity() {
        if (quantity <= 1) return;
        setQuantity(quantity - 1)
    }

    // Add item to cart
    function AddToCart() {
        dispatch(addToCart({ productDetails, quantity }));

        dispatch(showAlert(['Success', "Product is added to cart Successfully", 'block', 'success']));
        setTimeout(() => {
            dispatch(showAlert(['', '', 'hidden', 'error']));
        }, 2000)

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
            dispatch(showAlert({message: success, type: 'success'}))
            dispatch(clearSuccess());
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            
        }
        

        dispatch(getProductDetailsAsync(id));
        // eslint-disable-next-line
    }, [dispatch, error, success])


    return (
        <>
            {pending && <Loader />}
            {productDetails && <section className="text-gray-600 body-font overflow-hidden bg-white ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <ImageCarousel />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{productDetails.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productDetails.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <RatingStar rating={productDetails.rating} />
                                    <span className="text-gray-600 ml-3">{productDetails.numOfReviews} Reviews</span>
                                </span>

                            </div>
                            <p className="leading-relaxed">{productDetails.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div className="flex ml-6 items-center">

                                    <div className="flex">
                                        <button className="decrement bg-red-600 hover:bg-red-500 text-white py-2 px-3 text-xl" onClick={decreaseQuantity}>-</button>
                                        <input type="text" name="quantity" value={quantity} readOnly className='w-11 outline-none text-center' />
                                        <button className="increment bg-red-600 hover:bg-red-500 text-white py-2 px-3 text-xl" onClick={increaseQuantity}>+</button>

                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <span className="title-font font-medium text-2xl text-gray-900">{productDetails.price}</span>
                                <span className={`title-font font-bold text-xl block my-2 ${productDetails.stock>0? 'text-green-600': 'text-red-600'}`}>{productDetails.stock>0? 'In Stock': 'Out of Stock'}</span>
                                <button className="flex text-white mt-4 hover:bg-red-500 border-0 py-2 px-6 focus:outline-none bg-red-600 rounded" onClick={AddToCart}>Add to Cart</button>

                            </div>
                            <button className="flex mt-5 text-white hover:bg-red-500 border-0 py-2 px-6 focus:outline-none bg-red-600 rounded" onClick={handleClickOpen}>Review Product</button>

                         {/* Review Card */}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Review Product"}
                                </DialogTitle>
                                <DialogContent style={{display: 'flex', flexDirection: 'column', gap: '.8rem'}}> 
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                    <textarea name="comment" value={comment} cols="30" rows="4" className='border-2 border-gray-700 p-3 outline-none rounded' onChange={(e)=> setComment(e.target.value)}></textarea>
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={handleClose} className=' mx-6 text-red-600'>Cancel</button>
                                    <button onClick={submitReview} autoFocus>
                                        Submit
                                    </button>
                                </DialogActions>
                            </Dialog>
                            

                        </div>
                    </div>
                </div>

                <div className="reviews">
                    <h2 className='my-5 mx-auto w-52 text-2xl font-semibold text-center border-b border-stone-900 text-stone-800 hover:text-red-600'>Reviews</h2>

                    <div className="review-list px-8 py-2 ml-14">
                        {productDetails?.reviews && productDetails.reviews.map(review => {
                            return <ReviewCard review={review} key={review._id}/>

                        })}

                    </div>
                </div>

            </section>}


        </>
    )
}

export default ProductDetails