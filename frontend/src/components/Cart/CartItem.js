import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import img from '../../images/attire 1.webp'
import { useDispatch } from 'react-redux';
import { addToCart, removeCartItem } from '../../features/Cart/cartSlice';

function CartItem({item}) {
    const dispatch = useDispatch();

  function increaseQuantity() {
    let quantity = item.quantity + 1;
    if(item.quantity >= item.stock) return;
    let productDetails = item;
    dispatch(addToCart({productDetails, quantity} ))
  }

  function decreaseQuantity() {
    let quantity = item.quantity - 1;
    if(item.quantity <= 1) return;
    let productDetails = item;
    dispatch(addToCart({productDetails, quantity} ))
  }

  function removeItem(){
      dispatch(removeCartItem(item._id))
  }

  return (
    <>
    <div className="product flex items-center pt-2 ">
                        <img src={img} alt="Product" className='w-16'/>
                        <h4>{item.name}</h4>
                    </div>
                    <div className="quantity flex flex-col md:flex-row">
                            <button className="decrement bg-red-600 text-white py-1 md:px-3 px-2 md:text-xl hover:bg-red-500"  onClick={decreaseQuantity}>-</button>
                            <input type="text" name="quantity" value={item.quantity} readOnly className='md:w-11 w-8 outline-none text-center' />
                            <button className="increment bg-red-600 text-white py-1 md:px-3 px-2 md:text-xl hover:bg-red-500" onClick={increaseQuantity}>+</button>
                    </div>
                    <div className="sub-total">
                        <h4 className='text-xl'>{item.price * item.quantity}</h4>
                    </div>
                    <div className="remove">
                        <li className='hover:text-red-600 list-none cursor-pointer ' onClick={removeItem}><DeleteIcon style={{fontSize: '1.8rem'}}/></li>
                    </div>


    </>
  )
}

export default CartItem