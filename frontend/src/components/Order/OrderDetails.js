import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { orderDetailsAsync } from '../../features/Order/orderSlice';
import Loader from '../Loader';
import img from '../../images/attire 1.webp'


function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, pending, order } = useSelector(state => state.order);
  const { user } = useSelector(state => state.user);
  
  useEffect(() => {

    dispatch(orderDetailsAsync(id));

// eslint-disable-next-line
  }, [dispatch, id])


  return (
    <>
      {pending && <Loader />}
      {!pending && order && <div className="container p-4">
        <h2 className='text-3xl font-medium'>Order #{order._id}</h2>
          <div className="shipping-info mt-5">
            <h3 className='text-2xl font-medium'>Shipping Info</h3>
            <div className="info p-4">
            <div className="name flex gap-4 items-baseline">
              <h4 className='text-xl font-medium'>Name:</h4>
              <span>{user.name}</span>
            </div>
            <div className="phone flex gap-4 items-baseline">
              <h4 className='text-xl font-medium'>Phone:</h4>
              <span>{order.shippingInfo.phoneNo}</span>
            </div>
            <div className="address flex gap-4 items-baseline">
              <h4 className='text-xl font-medium'>Address:</h4>
              <span>{order.shippingInfo.address}</span>
            </div>
            </div>
          </div>

          <div className="payment">
            <h3 className='text-2xl font-medium'>Payment</h3>
            <div className="amount flex gap-4 p-4 items-baseline">
              <h4 className='text-xl font-medium'>Amount:</h4>
              <span>{order.totalPrice}</span>
            </div>
          </div>

          <div className="order-status">
            <h3 className='text-2xl font-medium'>Order Status</h3>
            <div className="status p-4 text-xl font-medium">
              {order.orderStatus}
            </div>
          </div>
          <hr />

          <div className="cart-items mx-4 mt-8">
            <h2 className='font-normal text-2xl mb-2'>Order Items</h2>
            { order.orderItems.map(item => {
              return <div className="cart-item flex justify-start md:justify-around gap-2 items-center m-3 flex-wrap" key={item._id}>
                <div className="item flex items-center md:gap-5 gap-3 ">
                  <img src={img} alt="Product" className='w-14 md:w-28 object-cover object-center  ' />
                  <h4>{item.name}</h4>
                </div>
                <div className="price">
                  <p>{`${item.quantity}*${item.price} = ${item.quantity * item.price}`}</p>
                </div>
              </div>
            })}

          </div>

      </div>
}

    </>

  )
}

export default OrderDetails