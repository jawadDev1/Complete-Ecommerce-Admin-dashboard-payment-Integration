import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

// redux imports 
import { useDispatch, useSelector } from "react-redux";
import { loadUserAsync } from "./features/User/userSlice";

// Components imports 
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ShowAlert from './components/Alert'

import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginAndSignup from "./components/User/LoginAndSignup";
import MyAccount from "./components/User/MyAccount";
import UpdateProfile from "./components/User/UpdateProfile";
import ChangePassword from "./components/User/ChangePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";

import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import MyOrders from "./components/Order/MyOrders";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import AllProducts from "./components/Admin/AllProducts";
import AddProduct from "./components/Admin/AddProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import AllOrders from "./components/Admin/AllOrders";
import UpdateOrder from "./components/Admin/UpdateOrder";
import AllUsers from "./components/Admin/AllUsers";
import UpdateUser from "./components/Admin/UpdateUser";
import CheckProductReviews from "./components/Admin/CheckProductReviews";



function App() {
  const { isAuthenticated, isAdmin } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  


  useEffect(() => {
    dispatch(loadUserAsync());

  }, [dispatch])

  return (
    <>
    <BrowserRouter>
      <ShowAlert />
      <Header />
      
      <div className="min-h-[60vh]">
      <Elements stripe={stripePromise} options={options}>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<LoginAndSignup />} />

          <Route exact path="/account" element={isAuthenticated && <MyAccount />} />
          <Route exact path="/updateprofile" element={isAuthenticated && <UpdateProfile />} />
          <Route exact path="/changepassword" element= {isAuthenticated && <ChangePassword />} />

          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword/:token" element={<ResetPassword />} />

          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/order/shipping" element={isAuthenticated && <Shipping />} />
          <Route exact path="/order/confirmorder" element={isAuthenticated && <ConfirmOrder />} />
          <Route exact path="/order/payment" element={isAuthenticated && <Payment />} />
        
          <Route exact path="/payment/success" element={isAuthenticated && <OrderSuccess />} />
          <Route exact path="/orders/myorders" element={isAuthenticated && <MyOrders />} />
          <Route exact path="/order/:id" element={isAuthenticated && <OrderDetails />} />

          <Route exact path="/admin/dashboard" element={isAuthenticated && isAdmin && <Dashboard />} />
          <Route exact path="/admin/products/allproducts" element={isAuthenticated && isAdmin && <AllProducts />} />
          <Route exact path="/admin/products/addproduct" element={isAuthenticated && isAdmin && <AddProduct />} />
          <Route exact path="/admin/products/:id" element={isAuthenticated && isAdmin && <UpdateProduct />} />
          <Route exact path="/admin/orders/allorders" element={isAuthenticated && isAdmin && <AllOrders />} />
          <Route exact path="/admin/orders/:id" element={isAuthenticated && isAdmin && <UpdateOrder />} />
          <Route exact path="/admin/users/allusers" element={isAuthenticated && isAdmin && <AllUsers />} />
          <Route exact path="/admin/users/:id" element={isAuthenticated && isAdmin && <UpdateUser />} />
          <Route exact path="/admin/reviews" element={isAuthenticated && isAdmin && <CheckProductReviews />} />

        </Routes>
        </Elements>
      </div>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
