
import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common'
import { Link } from 'react-router-dom'


const CategoryList = () => {
    const [categoryProduct,setCategoryProduct]=useState([])
    const [loading, setLoading] = useState(true)

     const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async ()=>{
            const response = await fetch(SummaryAPI.categoryProducts.url)
            const responseData = await response.json()
            setLoading(false)
            setCategoryProduct(responseData.data)
        }

   useEffect(()=>{
        fetchCategoryProduct()
   },[])
  return <>
    <div className='container mx-auto p-6 '>
         <div className='flex items-center gap-2 justify-between overflow-scroll scrollbar-none'>
         {

            loading ? (
                
                    categoryLoading.map((el, index)=>{
                           return (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}></div>
                           )
                    })
            )
            : (
                categoryProduct.map((product, index)=>{
                    return(
                       <Link to={`/product-category?category=${product?.Category}`} key={product?.Category} className=' cursor-pointer'>
                           <div className='w-16 h-16 p-4 md:w-20 md:h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden'>
                              <img className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all hover:scroll-smooth' src={product?.productImage[0]} alt={product?.productName}/>
                           </div>
                           <p className='text-center text-sm md:text-base capitalize'>{product?.Category}</p>
                       </Link>
                    )
                })
            )
           
         }
         </div>
    </div> 
  </>
}

export default CategoryList
