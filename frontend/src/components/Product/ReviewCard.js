import React from 'react'
import img from '../../images/defaultImage.png';
import RatingStar from './RatingStar';

function ReviewCard({review}) {
  
  return (
    <div className='bg-white p-3  shadow-md my-5'>
      <div className='flex items-center gap-4 mb-3'>
        <img src={img} alt="Review" className='w-11' loading='lazy' />
        <h4>{review.name}</h4>
      </div>
      <RatingStar rating = {review.rating}/>
      <p>{review.comment}</p>
    </div>
  )
}

export default ReviewCard