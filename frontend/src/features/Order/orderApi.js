import { makeHTTPRequest, makeHTTPRequestWithJSON, makeHTTPRequestWithForm } from '../makeHTTPRequest';

export function createOrder(order){
    return makeHTTPRequestWithJSON('orders/neworder', 'POST', JSON.stringify(order));
}

// send all the orders of user
export function myOrders(){
    return makeHTTPRequest('orders/myorders', 'GET');
}

// get the details of a order
export function orderDetails(id){
    return makeHTTPRequest(`orders/order/${id}`, 'GET');
}

// get all the orders for admin
export function getAllOrders(){
    return makeHTTPRequest(`orders/admin/allorders`, 'GET');
}

// delete order 
export function deleteOrder(id){
   return makeHTTPRequest(`orders/admin/order/${id}`, 'DELETE');
}

// update order status
export function updateOrder(id, updateForm){
    return makeHTTPRequestWithForm(`orders/admin/order/${id}`, 'PUT', updateForm);
}