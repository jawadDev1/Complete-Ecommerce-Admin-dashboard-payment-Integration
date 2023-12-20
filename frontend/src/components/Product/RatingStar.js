import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';


function RatingStar({ rating }) {

    const stars = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return (
            <span key={index}>{
                (rating >= index + 1) ? <StarIcon /> :
                    (rating >= number) ? <StarHalfIcon /> :
                        <StarBorderIcon />}
            </span>
        )
    })
     
    return (
        <div className='text-yellow-500'>{stars}</div>
    )
}

export default RatingStar