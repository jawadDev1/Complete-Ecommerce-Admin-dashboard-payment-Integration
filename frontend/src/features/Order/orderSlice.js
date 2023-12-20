import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, createOrder, myOrders, orderDetails, deleteOrder, updateOrder } from "./orderApi";

const initialState = {
    orders: null,
    order: null,
    success: false,
    error: null,
    pending: false,
    allOrders: []
}

// create a new order
export const createOrderAsync = createAsyncThunk('createOrderAsync', async (order)=> {
    const data = await createOrder(order);
    return data;
})

// get all the orders of user
export const myOrdersAsync = createAsyncThunk('myOrdersAsync', async ()=> {
    const data = await myOrders();
    return data;
})

// get all the orders of user
export const orderDetailsAsync = createAsyncThunk('orderDetailsAsync', async (id)=> {
    const data = await orderDetails(id);
    return data;
})

// get all the orders for admin
export const getAllOrdersAsync = createAsyncThunk('getAllOrdersAsync', async ()=> {
    const data = await getAllOrders();
    return data;
})

// delete a order
export const deleteOrderAsync = createAsyncThunk('deleteOrderAsync', async (id)=>{
    const data = await deleteOrder(id);
    return data;
 })

export const updateOrderAsync = createAsyncThunk('updateOrderAsync', async ({id, updateForm})=>{
    const data = await updateOrder(id, updateForm);
    return data;
 })

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearErrors: (state, action) => {
            state.error = null;
        },
        clearSuccess: (state, action) => {
            state.success = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(createOrderAsync.fulfilled, (state, action)=>{
            state.order = action.payload.order;
            state.success = true;
            state.pending = false
        })
        .addCase(createOrderAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(createOrderAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(myOrdersAsync.fulfilled, (state, action)=>{
            state.orders = action.payload.orders;
            state.success = true;
            state.pending = false
        })
        .addCase(myOrdersAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(myOrdersAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(orderDetailsAsync.fulfilled, (state, action)=>{
            state.order = action.payload.order;
            // state.success = true;
            state.pending = false
        })
        .addCase(orderDetailsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(orderDetailsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(getAllOrdersAsync.fulfilled, (state, action)=>{
            state.allOrders = action.payload.orders;
            state.pending = false
        })
        .addCase(getAllOrdersAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getAllOrdersAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(deleteOrderAsync.fulfilled, (state, action)=>{
            state.success = true;
            state.pending = false
        })
        .addCase(deleteOrderAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(deleteOrderAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(updateOrderAsync.fulfilled, (state, action)=>{
            state.success = action.payload.message;
            state.pending = false
        })
        .addCase(updateOrderAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(updateOrderAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
    }
})


export const {clearErrors, clearSuccess} = orderSlice.actions;
export default orderSlice.reducer;