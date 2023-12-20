import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { myOrdersAsync } from '../../features/Order/orderSlice';
import Loader from '../Loader';


function MyOrders() {
  const { orders, pending } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myOrders = [];

  orders && orders.forEach(item => {
    myOrders.push({
      id: item._id,
      product: item.orderItems.map(orderItem => {
        return `${orderItem.name}, `
      }),
      status: item.orderStatus,
      quantity: item.orderItems.length,
      amount: item.totalPrice
    })
  });


  function redirectToOrderDetail(id){
    navigate(`/order/${id}`)
  }

  useEffect(() => {
    dispatch(myOrdersAsync());
  }, [dispatch])


  return (
    <>
    {pending && <Loader />}
      {!pending && <div className="container p-3 flex flex-col">
        <div className="orders-heading grid grid-cols-5 bg-red-600 text-white p-3">
          <h4 className=''>Order Id</h4>
          <h4>Product</h4>
          <h4>Status</h4>
          <h4>Quantity</h4>
          <h4>Amount</h4>
        </div>
        <div className="my-orders ">
          {myOrders.length !== 0 && myOrders.map(order => (
            <div className="order grid grid-cols-5 my-5  border-b-2 border-gray-300 p-2
            hover:bg-gray-200 cursor-pointer" key={order.id} onClick={() => redirectToOrderDetail(order.id) }>
              <span className=''>{order.id}</span>
              <span >{order.product}</span>
              <span >{order.status}</span>
              <span >{order.quantity}</span>
              <span>{order.amount}</span>
            </div>
          ))}
      </div>
    </div >}

    </>
  )
}

export default MyOrders