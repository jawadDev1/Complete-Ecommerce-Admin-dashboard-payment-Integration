import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, clearSuccess, getProductDetailsAsync, updateProductAsync } from '../../features/Product/productSlice';
import Loader from '../Loader';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
import { useParams } from 'react-router-dom';


function UpdateProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails, error, pending, success } = useSelector(state => state.products)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(null)
    const [images, setImages] = useState([])
    const [imagesPreivew, setImagesPreview] = useState([]);
    const [imageChanged, setImageChanged] = useState(false);

    function handleImagesChange(e) {
        setImageChanged(true);
        let files = Array.from(e.target.files);
        setImages([])
        setImagesPreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            };

            reader.readAsDataURL(file);
        })

    }

    function handleUpdateProduct(e) {
        e.preventDefault();
        let productForm = new FormData();

        productForm.set('name', name);
        productForm.set('price', price);
        productForm.set('description', description);
        productForm.set('stock', stock);
        productForm.set('category', category);
        productForm.set('imageChanged', imageChanged);

        images.forEach(image => {
            productForm.append('images', image);
        });

        dispatch(updateProductAsync({productForm, id}));

    }

    useEffect(() => {

        if (error) {
            dispatch(showAlert({ message: error.message, type: 'error' }))
            dispatch(clearErrors())
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
            
            return;
        }

        if (success) {
            dispatch(showAlert({ message: 'Products is Updated Successfully', type: 'success' }))
            dispatch(clearSuccess())
            dispatch(getProductDetailsAsync(id));
            setTimeout(()=> {
                dispatch(clearAlert());
            }, 100)
        }
        if (!productDetails || productDetails._id !== id) {
            dispatch(getProductDetailsAsync(id));

        } else {

            setName(productDetails?.name);
            setDescription(productDetails?.description);
            setPrice(productDetails?.price);
            setStock(productDetails?.stock);
            setCategory(productDetails?.category);
            
            setImages(productDetails?.images);
            setImagesPreview(productDetails?.images);
        }
    }, [dispatch, error, success, pending, id, productDetails])

    function handleWheel(e){
        e.target.blur()

    }

    return (
        <>
            <div className="container flex md:flex-row flex-col gap-3">
                <div className="sidebar md:w-[20%] w-full md:border-r-2 border-gray-600">
                    <SideBar />
                </div>
                {productDetails && <div className="add-product-container md:w-[80%] w-full p-3">
                    <h2 className='text-2xl text-center font-medium my-5'>Add Product</h2>
                    {pending && <Loader />}
                    {!pending && <form className='w-[70%] mx-auto bg-white shadow-md p-3' onSubmit={handleUpdateProduct}>
                        <input type="text" placeholder='Product Name' name='name' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' value={name} onChange={(e) => setName(e.target.value)} required />

                        <input type="number" name='price' placeholder='Product Price' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' value={price} onChange={(e) => setPrice(e.target.value)} required onWheel={(e) => e.target.blur()}/>

                        <textarea type="text" name='description' rows={5} placeholder='Product Description' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                        <input type="number" placeholder='Product Stock' name='stock' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' value={stock} onChange={(e) => setStock(e.target.value)} required onWheel={(e) => e.target.blur()} />
                        <select name='category' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="Laptop">Laptop</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Laptop">Laptop</option>
                        </select>

                        <input type="file" name='avatar' className='w-[90%] mx-auto block border-2 py-2 px-2 my-3' multiple onChange={handleImagesChange} accept='image/*'  />

                        <div className="images-preview flex overflow-auto gap-2">
                            {imagesPreivew && imagesPreivew.map((image, index) => (
                                <img src={image.url || image} alt="Product Preview" key={index} className='w-1/6 object-cover object-center' />
                            ))}
                        </div>

                        <button className='w-[90%] mx-auto block text-white text-lg rounded py-2 px-2 my-5 bg-red-600 hover:bg-red-500' type='submit'>Update</button>

                    </form>}
                </div>}
            </div>

        </>
    )
}

export default UpdateProduct