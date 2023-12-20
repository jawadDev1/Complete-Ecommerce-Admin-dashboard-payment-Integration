const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`


export function createOrder(order){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/neworder`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(order)
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// send all the orders of user
export function myOrders(){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/myorders`, {
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

// get the details of a order
export function orderDetails(id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/order/${id}`, {
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

// get all the orders for admin
export function getAllOrders(){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/allorders`, {
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

// delete order 
export function deleteOrder(id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/order/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            
        })
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// update order status
export function updateOrder(id, updateForm){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/admin/order/${id}`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: updateForm
            
        })
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}