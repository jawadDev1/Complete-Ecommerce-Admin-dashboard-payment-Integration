import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReview, getProducts, getAllProducts, getCategories, getProductDetails, addNewProduct, deleteProduct, updateProduct, getProductReviews, deleteProductReview } from "./productAPI";


const initialState  = {
    products: [],
    productsCount: 0,
    productDetails: null,
    categories: [],
    pending: false,
    error: null,
    success: null,
    allProducts: [],
    reviews: []
}

// get all products
export const getProductsAsync = createAsyncThunk('getProductsAsync', async ({keyword, page, price, category})=>{
   const data = await getProducts(keyword, page, price, category);
    return data;
})


// get product details
export const getProductDetailsAsync = createAsyncThunk('getProductDetailsAsync', async (id)=>{
   const data = await getProductDetails(id);
   return data;
})

// get all the categories
export const getCategoriesAsync = createAsyncThunk('getCategoriesAsync', async ()=>{
   const data = await getCategories();
   return data;
})

// add product review
export const addReviewAsync = createAsyncThunk('addReviewAsync', async (reviewForm)=>{
   const data = await addReview(reviewForm);
   return data;
})

// get all the products for admin
export const getAllProductsAsync = createAsyncThunk('getAllProductsAsync', async ()=>{
   const data = await getAllProducts();
   return data;
})

// add a new product
export const addNewProductAsync = createAsyncThunk('addNewProductAsync', async (productForm)=>{
   const data = await addNewProduct(productForm);
   return data;
})

// delete a product
export const deleteProductAsync = createAsyncThunk('deleteProductAsync', async (id)=>{
   const data = await deleteProduct(id);
   return data;
})

// update a product
export const updateProductAsync = createAsyncThunk('updateProductAsync', async ({productForm, id})=>{
   const data = await updateProduct(productForm, id);
   return data;
})

// get product reviews
export const getProductReviewsAsync = createAsyncThunk('getProductReviewsAsync', async (id)=>{
   const data = await getProductReviews(id);
   return data;
})

// get product reviews
export const deleteProductReviewAsync = createAsyncThunk('deleteProductReviewAsync', async ({productId, reviewId})=>{
   const data = await deleteProductReview(productId, reviewId);
   return data;
})



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearErrors: (state, action) => {
            state.error = null;
        },
        clearSuccess: (state, action) => {
            state.success = false;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getProductsAsync.fulfilled, (state, action)=>{
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.pending = false
        })
        .addCase(getProductsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getProductsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(getProductDetailsAsync.fulfilled, (state, action)=>{
            state.productDetails = action.payload.product;
            // state.success = true;
            state.pending = false;
        })
        .addCase(getProductDetailsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getProductDetailsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(getCategoriesAsync.fulfilled, (state, action)=>{
            state.categories = action.payload.categories;
            state.pending = false
        })
        .addCase(getCategoriesAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getCategoriesAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(addReviewAsync.fulfilled, (state, action)=>{
            state.success = action.payload.message;
            state.pending = false
        })
        .addCase(addReviewAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(addReviewAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(getAllProductsAsync.fulfilled, (state, action)=>{
            state.allProducts = action.payload.products
            
            state.pending = false
        })
        .addCase(getAllProductsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getAllProductsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(addNewProductAsync.fulfilled, (state, action)=>{
            state.success = true;
            state.pending = false
        })
        .addCase(addNewProductAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(addNewProductAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(deleteProductAsync.fulfilled, (state, action)=>{
            state.success = true;
            state.pending = false
        })
        .addCase(deleteProductAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(deleteProductAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(updateProductAsync.fulfilled, (state, action)=>{
            state.success = true;
            state.pending = false
        })
        .addCase(updateProductAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(updateProductAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(getProductReviewsAsync.fulfilled, (state, action)=>{
            state.reviews = action.payload.reviews
            state.success = true;
            state.pending = false
        })
        .addCase(getProductReviewsAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(getProductReviewsAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
        .addCase(deleteProductReviewAsync.fulfilled, (state, action)=>{
            state.reviews = action.payload.reviews
            state.success = true;
            state.pending = false
        })
        .addCase(deleteProductReviewAsync.pending, (state, action)=>{
            state.pending = true
        })
        .addCase(deleteProductReviewAsync.rejected, (state, action)=>{
            state.error = action.error;
            state.pending = false
        })
    }
});

export const {clearErrors, clearSuccess} = productSlice.actions;
export default productSlice.reducer;