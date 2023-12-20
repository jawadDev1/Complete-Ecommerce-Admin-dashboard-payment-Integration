import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { clearErrors, clearSuccess, orderDetailsAsync, updateOrderAsync } from '../../features/Order/orderSlice';
import Loader from '../Loader';
import img from '../../images/attire 1.webp'
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';


function UpdateOrder() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');

    const { error, pending, order, success } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);

    function handleUpdateOrder() {
        let updateForm = new FormData();
        updateForm.set('status', status);
        dispatch(updateOrderAsync({ id, updateForm }));
    }

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

        dispatch(orderDetailsAsync(id));



        // eslint-disable-next-line
    }, [dispatch, id, success, error])


    return (
        <>
            {pending && <Loader />}
            {!pending && order && <div className="container p-4">
                <div className="inner-container flex">
                    <div className="left w-[70%]">
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
                            <div className={`status p-4 text-xl font-medium ${order.orderStatus === 'Delivered'? 'text-green-600': order.orderStatus === 'Processing' || order.orderStatus === 'Shipped'? 'text-blue-600': order.orderStatus==='Canceled'? 'text-red-600': 'text-black'}`} >
                                {order.orderStatus}
                            </div>
                        </div>
                    </div>
                    <div className="right w-[30%] border-l-2 border-gray-500 p-7 flex flex-col items-center gap-9">
                        <h2 className='text-2xl font-medium text-center'>Update Order Status</h2>
                        <select value={status} className='px-3 py-3 border w-full' onChange={(e) => setStatus(e.target.value)}>
                            <option value="status">Select Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <button className="btn w-full px-3 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-lg" onClick={handleUpdateOrder}>Update</button>
                    </div>
                </div>
                <hr />

                <div className="cart-items mx-4 mt-8">
                    <h2 className='font-normal text-2xl mb-2'>Order Items</h2>
                    {order.orderItems.map(item => {
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

            </div >
            }

        </>

    )
}

export default UpdateOrder