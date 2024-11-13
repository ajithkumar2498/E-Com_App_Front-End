import React from 'react'
import successGif from "../assets/Payment-success.gif"
import {Link} from 'react-router-dom'

const Success = () => {
  return <>
    <div className='bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-5 rounded'>
      <img src={successGif} width={150} height={150} className='mix-blend-multiply'/>
      <p className='text-green-700 font-bold text-xl'>Payment Done Successfully</p>
      <Link to={'/order'} className='p-2 px-4 mt-6 border-2 border-green-700 rounded font-semibold text-green-700 hover:bg-green-700 hover:text-white'>See Your Order</Link>
    </div>
  </>
}

export default Success
