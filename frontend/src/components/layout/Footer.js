import React from 'react'
import appStore from '../../images/appStoreLogo.png'
function Footer() {
  return (
    <footer className='flex justify-between md:pt-11 px-10 gap-4 p-3 bg-[#222121] text-white text-center mt-11'>
        <div className="leftFooter flex flex-col gap-2 w-1/3 p-2">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for IOS</p>    
        <img src={appStore} alt="Appstore" className='w-48 mx-auto'/>
        
        </div>

        <div className="midFooter ">
        <h1 className='md:text-[3rem] text-[1.2rem]  text-red-600'>ECOMMERCE.</h1>
        <p className='mt-4 mb-2 text-sm'>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; <span className='text-red-600'>Jawad Ali</span></p>
        </div>

        <div className="rightFooter flex flex-col gap-5 w-1/3 p-2">
        <h3 className=' hover:text-red-600'>Follow Us On</h3>
        <a href="/" target='_blank' className=' hover:text-red-600'>GitHub</a>
        <a href="/" target='_blank' className=' hover:text-red-600'>LinkedIn</a>
        <a href="/" target='_blank' className=' hover:text-red-600'>Facebook</a>
        </div>

    </footer>
  )
}

export default Footer