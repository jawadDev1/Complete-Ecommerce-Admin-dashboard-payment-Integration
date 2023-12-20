import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Pagination } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
// redux imports
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAsync, getCategoriesAsync, clearErrors } from '../../features/Product/productSlice';
import { clearAlert, showAlert } from '../../features/Alert/alertSlice';
// components imports
import Product from '../Home/Product';
import Filter from './Filter';

function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { products, productsCount, pending, error, categories } = useSelector(state => state.products)
  
  // States
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState([0, 100000])

  useEffect(() => {
    if (error) {
      dispatch(showAlert({message: error.message, type: 'error'}))
      dispatch(clearErrors())
      setTimeout(()=> {
        dispatch(clearAlert());
    }, 100)
      return;
  }
   
    dispatch(getProductsAsync({ keyword, page, price, category }));
    dispatch(getCategoriesAsync());
    // eslint-disable-next-line
  }, [dispatch, error, keyword, page, price, category]);

  const handleChange = (e) => {
    setPage(Number(e.currentTarget.textContent))

  }
  // Show filter
  const showFilter = ()=>{
    document.getElementById('filter').classList.toggle('showFilter')
  }
  return (
    <>
      <h2 className='my-5 w-52 text-2xl font-semibold text-center  text-stone-800 hover:text-red-600'>{keyword && `Results for ` + keyword}</h2>
      
      <div className='flex container px-5 py-10'>
        {/* Filter  */}
        <div className='text-2xl absolute left-4 top-20 mb-4 md:hidden' onClick={showFilter}><FilterAltIcon /></div>

        <div className="filter py-5 px-5  md:w-[20%] w-[50%] absolute md:static bg-white shadow-lg z-20 -left-48 transition-all duration-500" id='filter'>
          <div className="md:hidden absolute right-2 top-0" onClick={showFilter}><CloseIcon /></div>
          <Filter price={price} setPrice={setPrice} categories={categories} category={category} setCategory={setCategory}/>
        </div>

        <section className="text-gray-600 body-font md:w-[80%] w-[100%]" >
          <div className=" mx-auto">
            <div className="flex flex-wrap -m-4">
              {products && products.map(product => {
                return <Product key={product._id} product={product} />
              })}
              {!pending && (products.length === 0 ? 'No results to show' : '')}
            </div>

            {/* Pagination  */}
            <div className='mx-auto mt-7 p-4 w-52 flex items-center justify-center'>
              <Pagination count={Math.ceil(productsCount / 8)} variant="outlined" shape="rounded" page={page} onChange={handleChange}
                hideNextButton={true}
                hidePrevButton={true}
              />

            </div>
          </div>
        </section>



      </div>

    </>
  )
}

export default Products;