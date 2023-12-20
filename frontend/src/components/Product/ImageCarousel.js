import React, { useCallback, useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img from '../../images/1.jpg'
import img1 from '../../images/2.jpg'
import img2 from '../../images/3.jpg'
let images = [img, img1, img2]
function ImageCarousel() {
    const [slideImage, setSlideImage] = useState(0)

    const nextSlide = useCallback( ()=>{
        document.getElementById('slideImage').style.opacity = 100
        if(slideImage === images.length-1){
            setSlideImage(0);
            return;
        }
        setSlideImage(slideImage + 1)
    }, [slideImage])

    const prevSlide = useCallback( ()=>{
        if(slideImage === 0){
            setSlideImage(images.length-1);
            return;
        }
        setSlideImage(slideImage - 1)
    }, [slideImage])

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000)

        return ()=> clearInterval(slideInterval)
        
    }, [nextSlide, prevSlide])
    
    

    return (

        <div className="relative w-full lg:w-1/2 lg:h-auto h-auto flex items-center justify-between ">
            <div className="absolute left-0 cursor-pointer  bg-white p-2 rounded-full" onClick={prevSlide}><ArrowBackIosIcon /></div>

            <img src={images[slideImage]} alt="slide" className='w-full object-cover object-center rounded' id='slideImage'/>

            <div className="absolute right-0 cursor-pointer bg-white p-2 rounded-full" onClick={nextSlide}><ArrowForwardIosIcon /></div>
        </div>

    )
}

export default ImageCarousel