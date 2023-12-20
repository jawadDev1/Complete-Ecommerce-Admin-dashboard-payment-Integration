import React from 'react'
import RatingStar from '../Product/RatingStar'
import { Link } from 'react-router-dom'
import img from '../../images/1.jpg'

function Product({ product }) {
    

    return (
        <>
        <div className='lg:w-1/4 w-1/2 overflow-hidden'>
            <Link to={`/products/product/${product._id}`} >
            <div className=" p-4 hover:relative hover:shadow-lg hover:scale-105 duration-300 ">
                <div className="block relative  rounded overflow-hidden">  
                    <img alt="ecommerce" className="object-cover object-center bg-cover bg-center w-full h-full block" src={img} loading='lazy'/>
                </div>
                <div className="p-2  bg-slate-50">
                    <h3 className=" text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                    <div className='flex  items-center'>
                    <RatingStar rating={product.rating}/>
                    <span className='text-sm'>({product.numOfReviews})</span>
                    </div>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                    <p className="mt-1 text-red-700">{product.price}</p>
                </div>
            </div>
            </Link>
            </div>
        </>
    )
}

export default Product