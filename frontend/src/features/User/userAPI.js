import { makeHTTPRequest, makeHTTPRequestWithJSON, makeHTTPRequestWithForm } from '../makeHTTPRequest';
let url = `/api/v1/users`

// login 
export function login(loginEmail, loginPassword){
    return makeHTTPRequestWithJSON('users/login', 'POST', JSON.stringify({loginEmail, loginPassword}));
};

// signup
export function signup(formData){
    return makeHTTPRequestWithForm('users/signup', 'POST', formData);
}

// Load the user and get its details
export function loadUser(){
    return makeHTTPRequest('users/mydetails', 'GET');
}

// Logout the user
export function logout(){
    return makeHTTPRequest('users/logout', 'GET');
}

// Update user profile
export function updateProfile(formData){
    return makeHTTPRequestWithForm('users/updateprofile', 'PUT', formData);
}

// change the password
export function changePassword(oldPassword, newPassword, confirmPassword){
    makeHTTPRequestWithJSON('users/updatepassword', 'PUT', JSON.stringify({oldPassword, newPassword, confirmPassword}));
}

// forgot password - send the email to users email
export function forgotpassword(email){
    return makeHTTPRequestWithJSON('users/forgotpassword', 'POST', JSON.stringify({email}));
}


// reset users password
export function resetPassword(newPassword, confirmPassword, token){
    return makeHTTPRequestWithJSON(`users/resetpassword/${token}`, 'PUT', JSON.stringify({newPassword, confirmPassword}))
}

// get all the users for admin
export function getAllUsers(){
    return makeHTTPRequest('users/admin/getallusers', 'GET');
}

// Delete a user
export function deleteUser(id){
    return makeHTTPRequest(`users/admin/user/${id}`, 'DELETE')
}

// get user details
export function getUserDetails(id){
    return makeHTTPRequest(`users/admin/user/${id}`, 'GET')
}
// update user details
export function updateUser(id, updatedUser){
    return makeHTTPRequestWithJSON(`users/admin/user/${id}`, 'PUT', JSON.stringify(updatedUser));
}

