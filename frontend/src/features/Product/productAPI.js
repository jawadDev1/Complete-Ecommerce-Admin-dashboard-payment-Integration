import { makeHTTPRequest, makeHTTPRequestWithJSON, makeHTTPRequestWithForm } from '../makeHTTPRequest';

// get all products or filter them
export function getProducts(keyword = '', page = 1, price=[0, 100000], category){
    return new Promise( async (resolve, reject) => {
        let response;
        if(category){
            response = await fetch(`/api/v1/products/getallproducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`)

        }  else{
            response = await fetch(`/api/v1/products/getallproducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
        }

        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// get single product details
export function getProductDetails(id){
    return makeHTTPRequest(`products/product/${id}`, 'GET');
}

// get all the categories
export function getCategories(){
    return makeHTTPRequest(`products/categories`, 'GET');
}

// add product review
export function addReview(reviewForm){
    return makeHTTPRequestWithForm('products/review', 'PUT', reviewForm);
}

// get all the products for admin
export function getAllProducts(){
    return makeHTTPRequest('products/admin/getallproducts', 'GET');
}

// add product 
export function addNewProduct(productForm){
    return makeHTTPRequestWithForm(`products/admin/product`, 'POST', productForm);
}

// delete product 
export function deleteProduct(id){
    return makeHTTPRequest(`products/admin/product/${id}`, 'DELETE');
}

// update product 
export function updateProduct(productForm, id){
    return makeHTTPRequestWithForm(`products/admin/addproduct/${id}`, 'PUT', productForm);
}
// get all the reviews of a product
export function getProductReviews(id){
    return makeHTTPRequest(`products/reviews/${id}`, 'GET');
}

// delete a product review
export function deleteProductReview(productId, reviewId){
    return makeHTTPRequest(`products/reviews/${productId}?id=${reviewId}`, 'DELETE');
}