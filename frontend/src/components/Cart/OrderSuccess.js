import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrderAsync } from '../../features/Order/orderSlice';



function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.order)


  function viewProducts() {
    navigate('/orders/myorders');
  }

  const queries = location.search.split('&');
  const paymentId = queries[0].split('=')[1];
  const paymentStatus = queries[queries.length - 1].split('=')[1];

  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const shippingInfo = JSON.parse(sessionStorage.getItem('shippingInfo'));

  


  useEffect(() => {
    const paymentInfo = {
      id: paymentId,
      status: paymentStatus
    }

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.total,
      paymentInfo,
    };
 
    if (shippingInfo) {
      dispatch(createOrderAsync(order));
      sessionStorage.removeItem('shippingInfo')
      sessionStorage.removeItem('orderInfo')
      localStorage.removeItem('cartItems')
    }
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="container grid place-items-center h-80">
        <div>
          <h2 className='text-2xl font-medium '>Order placed Successfully</h2>
          <button className='w-44 py-3 rounded mt-4 mx-auto block outline-none text-white text-xl bg-red-600 hover:bg-red-500' onClick={viewProducts}>View Orders</button>
        </div>
      </div>

    </>
  )
}

export default OrderSuccess