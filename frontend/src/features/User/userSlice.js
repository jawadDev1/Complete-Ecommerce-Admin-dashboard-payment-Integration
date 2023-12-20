import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, loadUser, logout, updateProfile, changePassword, forgotpassword, resetPassword, getAllUsers, deleteUser, updateUser, getUserDetails } from "./userAPI";

const initialState  = {
    user: null,
    pending: false,
    error: null,
    isAuthenticated: false,
    isAdmin: false,
    success: false,
    allUsers: [],
    userDetails: null
}

// Login 
export const loginAsync = createAsyncThunk('user/loginAsync', async ({loginEmail, loginPassword})=>{
    
   const data = await login(loginEmail, loginPassword);
    return data;
})

// Signup
export const signupAsync = createAsyncThunk('user/signupAsync', async (formData)=>{
   const data = await signup(formData);
    return data;
})

// Load the user and get user details
export const loadUserAsync = createAsyncThunk('user/loadUserAsync', async ()=>{
   const data = await loadUser();
    return data;
})

// Logout the user
export const logoutAsync = createAsyncThunk('user/logoutAsync', async ()=>{
   const data = await logout();
    return data;
})

// Update  user profile
export const updateProfileAsync = createAsyncThunk('user/updateProfileAsync', async (formData)=>{
   const data = await updateProfile(formData);
    return data;
})

// change the password
export const changePasswordAsync = createAsyncThunk('user/changePasswordAsync', async ({oldPassword, newPassword, confirmPassword})=>{
   const data = await changePassword(oldPassword, newPassword, confirmPassword);
    return data;
})

// forgot password 
export const forgotPasswordAsync = createAsyncThunk('user/forgotPasswordAsync', async (email)=>{
   const data = await forgotpassword(email);
    return data;
})

// reset password 
export const resetPasswordAsync = createAsyncThunk('user/resetPasswordAsync', async ({newPassword, confirmPassword, token})=>{
   const data = await resetPassword(newPassword, confirmPassword, token);
    return data;
})

// get all the users for admin
export const getAllUsersAsync = createAsyncThunk('user/getAllUsersAsync', async ()=>{
   const data = await getAllUsers();
    return data;
})

// delete a user
export const deleteUserAsync = createAsyncThunk('user/deleteUserAsync', async (id)=>{
   const data = await deleteUser(id);
    return data;
})

// get user details
export const getUserDetailsAsync = createAsyncThunk('user/getUserDetailsAsync', async (id)=>{
   const data = await getUserDetails(id);
    return data;
})
// update user details
export const updateUserAsync = createAsyncThunk('user/updateUserAsync', async ({id, updatedUser})=>{
   const data = await updateUser(id, updatedUser);
    return data;
})



export const userSlice = createSlice({
    name: 'user',
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
        .addCase(loginAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.isAuthenticated = true;
            state.error = null;
            state.success = true;
            state.isAdmin = action.payload.user.role === "admin" ? true: false;
        })
        .addCase(loginAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(loginAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(signupAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.isAuthenticated = true;
            state.error = null;
            state.success = true;
        })
        .addCase(signupAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(signupAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(loadUserAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.isAuthenticated = true;
            state.error = null;
            state.isAdmin = action.payload.user.role === "admin" ? true: false;
        })
        .addCase(loadUserAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(loadUserAsync.rejected, (state, action)=>{
            // state.error = action.error;
            state.pending = false
        })
        .addCase(logoutAsync.fulfilled, (state, action)=>{
            state.user = null;
            state.pending = false;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(logoutAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(logoutAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(updateProfileAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.isAuthenticated = true;
            state.error = null;
            state.success = true;
        })
        .addCase(updateProfileAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(updateProfileAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(changePasswordAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.isAuthenticated = true;
            state.error = null;
            state.success = true;
        })
        .addCase(changePasswordAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(changePasswordAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(forgotPasswordAsync.fulfilled, (state, action)=>{
            state.pending = false;
            state.error = null;
            state.success = true;
        })
        .addCase(forgotPasswordAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(forgotPasswordAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(resetPasswordAsync.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.pending = false;
            state.error = null;
            state.success = true;
        })
        .addCase(resetPasswordAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(resetPasswordAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(getAllUsersAsync.fulfilled, (state, action)=>{
            state.allUsers = action.payload.users;
            state.pending = false;
            state.error = null;
            // state.success = true;
        })
        .addCase(getAllUsersAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getAllUsersAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(deleteUserAsync.fulfilled, (state, action)=>{
            state.pending = false;
            state.error = null;
            state.success = action.payload.message;
        })
        .addCase(deleteUserAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(deleteUserAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(getUserDetailsAsync.fulfilled, (state, action)=>{
            state.userDetails = action.payload.user;
            state.pending = false;
            state.error = null;
            state.success = true;
        })
        .addCase(getUserDetailsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getUserDetailsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        .addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.pending = false;
            state.error = null;
            state.success = action.payload.message;
        })
        .addCase(updateUserAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(updateUserAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false;
            state.success = false;
        })
        
    }
});

export const {clearErrors, clearSuccess} = userSlice.actions;
export default userSlice.reducer;