
let url = '/api/v1/products'

// get all products or filter them
export function getProducts(keyword = '', page = 1, price=[0, 100000], category){
    return new Promise( async (resolve, reject) => {
        let response;
        if(category){
            response = await fetch(`${url}/getallproducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`)

        }  else{
            response = await fetch(`${url}/getallproducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
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
    return new Promise( async (resolve, reject) => {
        const response = await fetch(`${url}/product/${id}`)
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        resolve(data);
    })
}

// get all the categories
export function getCategories(){
    return new Promise( async (resolve, reject) => {
        const response = await fetch(`${url}/categories`)
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        resolve(data);
    })
}

// add product review
export function addReview(reviewForm){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/review`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: reviewForm
        })
        
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}


// get all the products for admin
export function getAllProducts(){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/getallproducts`, {
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

// add product 
export function addNewProduct(productForm){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/addproduct`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: productForm
        })
        
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

// delete product 
export function deleteProduct(id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/product/${id}`, {
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

// update product 
export function updateProduct(productForm, id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/admin/product/${id}`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: productForm
        })
        
       
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}
// get all the reviews of a product
export function getProductReviews(id){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/reviews/${id}`, {
            method: 'GET',
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

// delete a product review
export function deleteProductReview(productId, reviewId){
    return new Promise( async (resolve, reject) => {
        
        let response = await fetch(`${url}/reviews/${productId}?id=${reviewId}`, {
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