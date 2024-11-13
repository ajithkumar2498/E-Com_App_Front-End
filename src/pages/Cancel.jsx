import React from 'react'
import cancelGif from "../assets/Payment-cancel.gif"
import {Link} from 'react-router-dom'

const Cancel = () => {
  return <>
    <div className='bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-5 rounded'>
      <img src={cancelGif} width={150} height={150} className='mix-blend-multiply' />
      <p className='text-red-600 font-bold text-xl'>Payment Cancelled</p>
      <Link to={'/cart'} className='p-2 px-4 mt-6 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Cart</Link>
    </div>
  </>
}

export default Cancel