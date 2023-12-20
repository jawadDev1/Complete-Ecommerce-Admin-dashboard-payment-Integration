import React from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CartItem from './CartItem'
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)


    return (
        <>
            { (cartItems.length === 0) && <div className='grid place-items-center h-52'>
                <div className="text-center">
                    <div className='mb-3'><RemoveShoppingCartIcon style={{ fontSize: '4rem' }} /></div>
                    <Link to={'/products'} className='bg-red-600 hover:bg-red-500 rounded-lg px-3 py-2 text-white text-xl w-32 my-2 outline-none'>View Products</Link>
                </div>
            </div>}
            {cartItems.length !== 0 && <div className="container p-3 min-h-[90vh]">
                <div className="cart-grid-style p-2  bg-red-600 text-white text-center">
                    <h3>Products</h3>
                    <h3 >Quantity</h3>
                    <h3>SubTotal</h3>
                </div>

                <div className="products cart-grid-style place-items-center gap-5">
                    {cartItems && cartItems.map(item => {
                        return <CartItem key={item._id} item={item} />
                    })}

                </div>

                <div className="gross-total w-72 ml-auto  border-t-4 border-red-600 pt-8 px-4 my-16">
                    <div className=" flex justify-between">
                        <h4 className='text-xl font-medium'>Gross Total</h4>
                        <span className='text-xl'>
                            {`RS ${cartItems.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0)}`}
                        </span>
                    </div>
                    <Link to={'/login?redirect=shipping'} className='bg-red-600 hover:bg-red-500 rounded-lg px-3 py-2 text-white text-xl mt-5 w-full block text-center outline-none'>Checkout</Link>
                </div>

            </div>}



        </>
    )
}

export default Cart