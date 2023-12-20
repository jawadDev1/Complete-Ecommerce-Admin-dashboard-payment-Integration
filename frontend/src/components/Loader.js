import React from 'react'

function Loader() {
  return (
    <div className='w-full h-[40vh] flex justify-center items-center '>
        <div className="w-36 h-36 rounded-full border-b-4 border-black opacity-60 animate-spin"></div>
    </div>
  )
}

export default Loader