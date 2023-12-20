import React, { useEffect } from 'react'
import { Doughnut, Line } from "react-chartjs-2";
import SideBar from './SideBar'
import {Chart, Tooltip, Legend, ArcElement, CategoryScale, PointElement, LinearScale, LineElement} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAsync } from '../../features/Product/productSlice';
import { getAllUsersAsync } from '../../features/User/userSlice';
import { getAllOrdersAsync } from '../../features/Order/orderSlice';


function Dashboard() {
  Chart.register(Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, ArcElement);

  const dispatch = useDispatch();

  const {allUsers} = useSelector(state => state.user)
  const {allOrders} = useSelector(state => state.order)
  const {allProducts} = useSelector(state => state.products)


let totalAmount = 0;

allOrders && allOrders.forEach(order => {
  totalAmount += order.totalPrice;

})

let outOfStock = 0;
allProducts && allProducts.forEach( product => {
  if(product.stock === 0) {
    outOfStock += 1;
  }
})

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount]
      }
    ]
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, allProducts.length - outOfStock]
      },
      
    ]
  };

  useEffect(() => {
    dispatch(getAllProductsAsync())
    dispatch(getAllUsersAsync())
    dispatch(getAllOrdersAsync())
  }, [dispatch])
  

  return (
    <>
      <div className="container flex md:flex-row flex-col gap-3">
        <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
          <SideBar />
        </div>
        <div className="dashboard-container md:w-[80%] w-full p-3">

          <h2 className='text-2xl font-medium text-center'>DashBoard</h2>
          <div className="total-amount bg-blue-700 w-full text-center text-white my-4 text-xl">
            <p>Total Amount</p>
            <p>{totalAmount}</p>
          </div>

          <div className="summary flex gap-5 justify-around">
            <div className="grid place-items-center products w-1/4 h-44 rounded-[50%] p-2 bg-green-700 text-center text-white text-xl">
              <div>
                <p>Products</p>
                <p>{allProducts.length}</p>
              </div>
            </div>
            <div className="grid place-items-center products w-1/4 h-44 rounded-[50%] p-2 bg-red-700 text-center text-white text-xl">
              <div>
                <p>Orders</p>
                <p>{allOrders.length}</p>
              </div>
            </div>
            <div className="grid place-items-center products w-1/4 h-44 rounded-[50%] p-2 bg-yellow-700 text-center text-white text-xl">
              <div>
                <p>Users</p>
                <p>{allUsers.length}</p>
              </div>
            </div>
          </div>

          <div className="line-chart md:w-[80%] mx-auto my-11" >
            <Line data={lineState} />
          </div>
          <div className="doughnut-chart md:w-[40%] w-[80%] mx-auto my-11" >
            <Doughnut data={doughnutState} options={{responsive: true}}/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard