import React, { useEffect } from 'react';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductsAsync } from '../../features/Product/productSlice';
import {clearAlert, showAlert} from '../../features/Alert/alertSlice';
import Loader from '../Loader';
  

function FeaturedProducts() {
    const dispatch = useDispatch();
    const {products, pending, error} = useSelector(state => state.products)
    const keyword = '';
    const page = 1;

    useEffect(() => {
        if(error){
            
            dispatch(showAlert({message: error.message, type: 'error'}))
            dispatch(clearErrors()) 
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            return;
        }
        
        dispatch(getProductsAsync({keyword, page}));
        
        // eslint-disable-next-line
        }, [dispatch, error]);
    
    return (
        <>
            
            <h2 className='my-5 mx-auto w-52 text-2xl font-semibold text-center border-b-2 border-stone-900 text-stone-800 hover:text-red-600'>Featured Products</h2>
            {pending && <Loader />}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products && products.map( product => {
                            return <Product key={product._id} product={product} />
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedProducts