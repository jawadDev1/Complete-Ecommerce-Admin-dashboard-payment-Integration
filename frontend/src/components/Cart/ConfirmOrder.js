import React from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useSelector } from 'react-redux'
import img from '../../images/attire 1.webp'
import { useNavigate } from 'react-router-dom';



function ConfirmOrder() {
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { shippingInfo, cartItems } = useSelector(state => state.cart)

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shippingCharges = subTotal >= 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const total = subTotal + shippingCharges + tax

  function proceedToPayment() {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      total
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/order/payment')
  }

  return (
    <>
      <CheckOutSteps activeStep={1} />
      <div className="container flex md:flex-row flex-col">
        <div className="left md:w-[60%] p-4">
          <div className="shipping-info mx-5 my-3">
            <h3 className='font-normal text-2xl mb-2'>Shipping Info</h3>

            <div className="order-details p-3">
              <div className="name flex gap-4">
                <h5 className='font-medium text-xl'>Name:</h5>
                <span className=' '>{user.name}</span>
              </div>

              <div className="phone flex gap-4 ">
                <h5 className='font-normal text-xl'>Phone:</h5>
                <span className=' '>{shippingInfo.phoneNo}</span>
              </div>

              <div className="address flex gap-4">
                <h5 className='font-normal text-xl'>Address:</h5>
                <span className=' '>{shippingInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="cart-items mx-4 mt-8">
            <h3 className='font-normal text-2xl mb-2'>Cart Items</h3>
            {cartItems.map(item => {
              return <div className="cart-item flex justify-start md:justify-around gap-2 items-center m-3 flex-wrap" key={item._id}>
                <div className="item flex items-center md:gap-5 gap-3">
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

        <div className="right  md:w-[40%] md:border-l-4 p-3  md:mx-auto">
          <h3 className='text-2xl text-center'>Order Summery</h3>
          <div className="price-details border-y-2 border-gray-400 py-3">
            <div className="sub-total flex justify-between my-4">
              <h4 className='text-xl font-medium'>Sub Total:</h4>
              <span>{subTotal}</span>
            </div>

            <div className="shipping-charges flex justify-between my-4">
              <h4 className='text-xl font-medium'>Shipping Charges: </h4>
              <span>{shippingCharges}</span>
            </div>

            <div className="gst flex justify-between my-4">
              <h4 className='text-xl font-medium'>GST: </h4>
              <span>{tax}</span>
            </div>
          </div>
          <div className="total flex justify-between my-4">
            <h4 className='text-xl font-medium'>Total: </h4>
            <span>{total}</span>
          </div>
          <button to={'/order/payment'} className='bg-red-600 hover:bg-red-500 p-3 rounded text-lg text-white  mx-auto w-full' onClick={proceedToPayment}>Proceed To Payment</button>

        </div>
      </div>

    </>
  )
}

export default ConfirmOrder