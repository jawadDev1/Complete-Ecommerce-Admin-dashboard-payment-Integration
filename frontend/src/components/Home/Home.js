import React from 'react'
import ImageSlider from './ImageSlider'
import FeaturedProducts from './FeaturedProducts'

function Home() {
  return (
    <>
      <div className="container">
        <ImageSlider />
        <FeaturedProducts />
      </div >
    </>
  )
}

export default Home