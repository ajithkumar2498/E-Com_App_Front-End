import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/DisplayCurrency'
import Context from '../context'
import addToCart from '../helpers/AddToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async (e,id) =>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }

  return <>
  
  <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-2 md:gap-4 overflow-x-scroll scrollbar-none transition-all' >
                        
                        { 
                         
                          loading ? (
                            loadingList.map((product, index)=>{
                            
                                return (
                                    <div className = 'w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse '>
                            
                                        </div>
                                        <div className='p-4 grid gap-3'>
                                           <h2 className='font-medium text-black text-base md:text-lg text-ellipsis line-clamp-1 p-1 animate-pulse rounded-full py-2 bg-slate-200'></h2>
                                           <p className='capitalize text-slate-500  p-1 animate-pulse rounded-full py-2 bg-slate-200'></p>
                                           <div className="flex gap-3">
                                              <p className='text-blue-700 font-medium p-1 animate-pulse rounded-full bg-slate-200 py-2 w-full'></p>
                                              <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 py-2 w-full'></p>
                                           </div>
                                           <button className=' m-2 text-white py-3 px-3 text-sm p-1 animate-pulse rounded-full bg-slate-200'></button>
                                        </div>
                                    </div>
                                )
                            })
                          ) : (
                            data.map((product, index)=>{
                            
                                return (
                                    <Link to={`/product/${product._id}`} className = 'w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                                        <div className='bg-slate-100 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                             <img src={product.productImage[0]} className='object-scale-down mix-blend-multiply cursor-pointer h-full hover:scale-110 transition-all'/>
                                        </div>
                                        <div className='p-4 grid gap-3'>
                                           <h2 className='font-medium text-black text-base md:text-lg text-ellipsis line-clamp-1 cursor-pointer'>{product?.productName}</h2>
                                           <p className='capitalize text-slate-700'>{product?.Category}</p>
                                           <div className="flex gap-3">
                                              <p className='text-blue-700 font-medium '>{displayINRCurrency(product?.sellingPrice)}</p>
                                              <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                           </div>
                                           <button className='bg-blue-600 m-2 text-white rounded-full py-0.5 px-3 text-sm hover:bg-yellow-500' onClick={(e)=> handleAddToCart(e,product?._id)} >Add to cart</button>
                                        </div>
                                    </Link>
                                )
                            })
                          )
                            
                        }
  </div>

  </>
}

export default VerticalCard