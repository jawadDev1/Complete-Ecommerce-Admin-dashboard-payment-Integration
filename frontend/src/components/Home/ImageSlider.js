import React from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


import slide1 from '../../images/slide1.jpg'
import slide2 from '../../images/slide2.jpg'
import slide3 from '../../images/slide3.jpg'


const slideImages = [
  {
    url: slide1,
    caption: "Slide 1"
  },
  {
    url: slide2,
    caption: "Slide 2"
  },
  {
    url: slide3,
    caption: "Slide 3"
  },
]

function ImageSlider() {
  return (
    <>
      <div className="slide-container">
        <Fade>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div style={{ 'backgroundImage': `url(${slideImage.url})` }} className='md:h-[50vh] h-[30vh] bg-cover bg-no-repeat bg-center'>
              
              </div>
            </div>
          ))}
        </Fade>
      </div>

    </>
  )
}

export default ImageSlider