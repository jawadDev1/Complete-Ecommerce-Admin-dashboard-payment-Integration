import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/Product/productSlice";
import alertSlice from "./features/Alert/alertSlice";
import userSlice from "./features/User/userSlice";
import cartSlice from "./features/Cart/cartSlice";
import ordersSlice from './features/Order/orderSlice';

const store = configureStore({
    reducer: {
       products: productSlice,
       user: userSlice,
       alert: alertSlice,
       cart: cartSlice,
       order: ordersSlice
    }
});

export default store;