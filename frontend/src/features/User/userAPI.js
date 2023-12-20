// let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`
let url = `/api/v1/users`

// login 
export function login(loginEmail, loginPassword){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({loginEmail, loginPassword})
        })
        
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// signup
export function signup(formData){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/signup`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData
        })
        
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// Load the user and get its details
export function loadUser(){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/mydetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include'
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// Logout the user
export function logout(){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/logout`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// Update user profile
export function updateProfile(formData){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/updateprofile`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// change the password
export function changePassword(oldPassword, newPassword, confirmPassword){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/updatepassword`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({oldPassword, newPassword, confirmPassword})
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// forgot password - send the email to users email
export function forgotpassword(email){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/forgotpassword`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({email})
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}


// forgot password - send the email to users email
export function resetPassword(newPassword, confirmPassword, token){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/resetpassword/${token}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({newPassword, confirmPassword})
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// get all the users for admin
export function getAllUsers(){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/getallusers`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }, 
            mode: 'cors',
            credentials: 'include'
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// get all the users for admin
export function deleteUser(id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/user/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }, 
            mode: 'cors',
            credentials: 'include'
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// get user details
export function getUserDetails(id){
    return new Promise( async (resolve, reject) => {
        console.log('yo ho ho')
        let response = await fetch(`${url}/admin/user/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }, 
            mode: 'cors',
            credentials: 'include',
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}
// update user details
export function updateUser(id, updatedUser){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/user/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }, 
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(updatedUser)
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

