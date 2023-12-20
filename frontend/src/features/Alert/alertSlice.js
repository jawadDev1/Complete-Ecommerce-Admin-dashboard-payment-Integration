import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    show_alert: false,
    message: '',
    type: 'default',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.show_alert = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        }, 
        clearAlert : (state, action) => {
            state.show_alert = false;
        }
    }
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;