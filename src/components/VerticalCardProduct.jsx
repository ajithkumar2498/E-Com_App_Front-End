import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import addToCart from '../helpers/AddToCart'
import { Link } from 'react-router-dom'

const VerticalProductCard = ({
    category, heading
}) => {
  
  const [data,setData] = useState([])
  const [loading,setLoading] =useState(false)
  const loadingList = new Array(13).fill(null)

  const[scroll,setScroll]= useState(0)
  const scrollElement = useRef()

  const fetchData = async()=>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
}

  useEffect(()=>{
     fetchData()
  },[])

  const scrollRight = ()=>{
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = ()=>{
    scrollElement.current.scrollLeft -= 300
  }

  return <>
    
    <div className='container mx-auto px-4 my-6 relative'>
               
                <h2 className='text-lg font-semibold py-4'>{heading}</h2>
                
                <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                        
                        <button  onClick={scrollLeft}className='bg-white p-1 shadow-md rounded-full absolute left-0 text-lg hidden md:block'>
                            <FaAngleLeft /></button>
                        <button onClick={scrollRight} className='bg-white p-1 shadow-md rounded-full absolute right-0 text-lg hidden md:block'>
                            <FaAngleRight /> </button>
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
                                    <Link to={`product/${product._id}`} className = 'w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
                                           <button className='bg-blue-600 m-2 text-white rounded-full py-0.5 px-3 text-sm hover:bg-yellow-500' onClick={(e)=> addToCart(e,product?._id)} >Add to cart</button>
                                        </div>
                                    </Link>
                                )
                            })
                          )
                            
                        }
                </div>
               
    </div>
  
 </>
}

export default VerticalProductCard