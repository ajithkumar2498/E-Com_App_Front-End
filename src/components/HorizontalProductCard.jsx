import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/AddToCart'
import Context from '../context'


const HorizontalProductCard = ({
    category, heading
}) => {
  
  const [data,setData] = useState([])
  const [loading,setLoading] =useState(true)
  const loadingList = new Array(13).fill(null)

  const[scroll,setScroll]= useState(0)
  const scrollElement = useRef()

  const { fetchUserAddToCart } = useContext(Context)
  const handleAddToCart = async (e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

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
                
                <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                        
                        <button  onClick={scrollLeft}className='bg-white p-1 shadow-md rounded-full absolute left-0 text-lg hidden md:block'>
                            <FaAngleLeft /></button>
                        <button onClick={scrollRight} className='bg-white p-1 shadow-md rounded-full absolute right-0 text-lg hidden md:block'>
                            <FaAngleRight /> </button>
                        {   loading ? (
                               loadingList.map((product, index)=>{
                            
                                return (
                                    <div key={index} className = 'w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                        <div className='bg-slate-100 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                            
                                        </div>
                                        <div className='p-4 grid w-full gap-2'>
                                           <h2 className='font-medium text-black bg-slate-200 text-base md:text-lg text-ellipsis line-clamp-1 p-1 rounded-full'></h2>
                                           <p className='capitalize text-slate-700 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                           <div className="flex gap-3 w-full">
                                              <p className='text-blue-700 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                              <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                           </div>
                                           <button className=' m-2 text-white bg-slate-200 rounded-full w-full py-0.5 px-3 text-sm '></button>
                                        </div>
                                    </div>
                                )
                            })

                        ) : (

                            data.map((product, index)=>{
                            
                                return (
                                    <Link to={`product/${product._id}`} className = 'w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                        <div className='bg-slate-100 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                             <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                                        </div>
                                        <div className='p-4 grid'>
                                           <h2 className='font-medium text-black text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                           <p className='capitalize text-slate-700'>{product?.Category}</p>
                                           <div className="flex gap-3">
                                              <p className='text-blue-700 font-medium '>{displayINRCurrency(product?.sellingPrice)}</p>
                                              <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                           </div>
                                           <button className='bg-blue-600 m-2 text-white rounded-full py-0.5 px-3 text-sm hover:bg-yellow-500' onClick={(e)=> handleAddToCart(e,product?._id)}>Add to cart</button>
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

export default HorizontalProductCard