import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import SummaryAPI from '../common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/DisplayCurrency';
import { MdShoppingCart } from "react-icons/md";
import CategoryWiseProductDiaplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/AddToCart';
import Context from '../context';


const ProductDetails = () => {

  const [data, setData] = useState({
    productName:"",
    BrandName:"",
    Category:"",
    description:"",
    price:"",
    sellingPrice:"",
    productImage: [],
  })
   const params = useParams()
   const [loader, setLoader] =useState(true)
   const productImageListLoading = new Array(4).fill(null)
   const [activeImage, setActiveImage] =useState("")
   const nav = useNavigate()
   const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
   })
   const [zoomImage, setZoomImage] =useState(false)
   const { fetchUserAddToCart } = useContext(Context)

  const fetchProductDetails = async ()=>{
    setLoader(true)
     const response =await fetch(SummaryAPI.productDetails.url,{
      method:SummaryAPI.productDetails.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        productId:params?.id
      })
     })
     
     const dataResponse = await response.json()
     setLoader(false)
     setData(dataResponse?.data)
     setActiveImage(dataResponse?.data?.productImage[0])
  }
  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e)=>{
         setZoomImage(true)
        const {left, top, height, width} =e.target.getBoundingClientRect()
        console.log("coordinate", left, top , width , height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
          x,
          y
        })
        
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id)=>{
         await addToCart(e, id)
         fetchUserAddToCart()
  }

  const handleBuyProduct = async (e,id)=>{
    await addToCart(e, id)
    fetchUserAddToCart()
    nav("/cart")
  }

  return <>
  
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

              {/* {product Image} */}
         <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 relative'>
             <div className='h-[300px] w-[300px] lg:h-96 bg-slate-200 relative p-2 lg:w-96'>
                 <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                    {/* Product ZOOM */}
                    {
                      zoomImage && (
                        <div className='hidden lg:block overflow-hidden absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                            <div
                              className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-150'
                              style={{
                              backgroundImage :`url(${activeImage})`,
                              backgroundRepeat:'no-repeat',
                              backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                              }} 
                            >
                            </div>
                         </div>
                      )
                    }

             </div>
             <div className='h-full'>
                {
                  loader ? (
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full transition-all animate-pulse'>
                        {
                          productImageListLoading.map((el,index)=>{
                            return (
                              <div className='h-20 w-20 bg-slate-200 animate-pulse rounded' key={"loadingImage"+index}>
        
                              </div>
                            )
                          })
                       }
                    </div>
                  ) : (
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                      {
                        data?.productImage?.map((imageURL,index)=>{
                          return (
                            <div className='h-20 w-20 bg-slate-200 rounded' key={imageURL}>
                              <img src={imageURL} alt=""  className='h-full w-full object-scale-down cursor-pointer mix-blend-multiply p-1' onClick={()=> handleMouseEnterProduct(imageURL)} onMouseEnter={()=> handleMouseEnterProduct(imageURL)}/>
                           </div>
                          )
                        })
                      }
                    </div>
                  )
               }
             </div>
         </div>

              {/* {product Details} */}
          {
            loader ? (
              <div className='grid gap-1 w-full'>
              <p className=' bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl w-full font-medium h-6 lg:h-8 bg-slate-200 animate-pulse '></h2>
              <p className='capitalize text-slate-400 w-full lg:h-8 bg-slate-200 min-w-[100px] animate-pulse h-6'></p>
  
              <div className='text-yellow-500 w-full lg:h-8 bg-slate-200 h-6 animate-pulse flex items-center gap-1'>
               
              </div>
  
              <div className='flex items-center gap-2 w-full lg:h-8 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse bg-slate-200'>
                 <p className='text-red-600 w-full lg:h-8'></p>
                 <p className='text-slate-400 line-through bg-slate-200 w-full lg:h-8'></p>
              </div>
  
              <div className='flex items-center gap-3 my-2 w-full lg:h-8 '>
                  <button className='h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8 '></button>
                  <button className='h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8 '></button>
              </div>
            
              <div className='w-full lg:h-8'>
                <p className='text-slate-600 font-medium my-1 h-6 w-full animate-pulse bg-slate-200 lg:h-8'></p>
                <p className='h-10 animate-pulse bg-slate-200 w-full lg:h-12'></p>
              </div>
           </div>
            ) : (
                <div className='flex flex-col gap-1'>
                <p className='bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit'>{data?.BrandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.Category}</p>
    
                <div className='text-yellow-500 flex items-center gap-1'>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStarHalf/>
                </div>
    
                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                </div>
    
                <div className='flex items-center gap-3 my-2'>
                    <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:text-white hover:bg-blue-700' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy Now</button>
                    <button className='border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white flex items-center' onClick={(e)=>handleAddToCart(e,data?._id)}> <span className='text-white pr-2 font-medium hover:text-blue-600'><MdShoppingCart/></span>Add to Cart</button>
                </div>
              
                <div>
                  <p className='text-slate-600 font-medium my-1'>Description:</p>
                  <p>{data?.description}</p>
                </div>
                </div>
            )
          }

      </div>
        {
          data.Category && (
            <>
            <CategoryWiseProductDiaplay  heading={"Recommended products"} category = {data?.Category}/>
            </>
          )
            
        }
     
    </div>
   
  </>
}

export default ProductDetails