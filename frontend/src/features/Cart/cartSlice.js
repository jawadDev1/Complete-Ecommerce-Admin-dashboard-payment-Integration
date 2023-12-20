import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: (localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')): [],
    shippingInfo: {},
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
            let { name, _id, price, images, stock } = action.payload.productDetails;
            let quantity = action.payload.quantity;
            let item = { name, _id, price, images, stock, quantity }

            let itemExist = state.cartItems.find(i => {
                return i._id === _id
            })

            if (itemExist) {
                state.cartItems = state.cartItems.map(i => {
                    return (i._id === _id) ? item : i;
                })
                localStorage.setItem('cartItems', JSON.stringify([...state.cartItems]))
            } else {
                state.cartItems.push({ _id, name, price, images, stock, quantity });
                localStorage.setItem('cartItems', JSON.stringify([...state.cartItems]))
            }
        },

        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => {
                return item._id !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify([...state.cartItems]))
        },

        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        }
    }
});

export const { addToCart, removeCartItem, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;