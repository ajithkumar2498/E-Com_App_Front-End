import React, { useEffect, useState } from 'react'
import { FaUpload } from "react-icons/fa6";
import UploadProducts from '../components/UploadProducts';
import SummaryAPI from '../common';
import AdminProductCard from '../components/AdminProductCard';


const AllProducts = () => {
const [ openUploadProducts, setOpenUploadProducts] = useState(false)
const [allProducts, setAllProducts] = useState([])

const fetchAllProduct = async (req,res)=>{
  const fetchResponse = await fetch(SummaryAPI.allProducts.url,{
    method:SummaryAPI.allProducts.method,
  })

  const responseData = await fetchResponse.json()
  setAllProducts(responseData?.data || [])
}

useEffect(()=>{
  fetchAllProduct()
},[])
  return<>
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center '>
        <h2 className='font-bold text-lg '>All Products</h2>
          <button className='border-2 flex items-center transition-all justify-start border-yellow-400 text-xs text-blue-500 hover:bg-yellow-400 hover:text-white py-1 px-3 rounded-full' onClick={()=> setOpenUploadProducts(true)}> 
            <span className='pr-2'><FaUpload /></span> Upload Product</button>
      </div>
        {/* All Products */}
       <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-200px)] overflow-y-scroll'>
             {
              allProducts.map((product, index)=>{
                return (
                  <AdminProductCard fetchData={fetchAllProduct} data={product} key={index + "all product"}/>
                )
              })
             } 
       </div>

      {/* {upload product component} */}

      {

        openUploadProducts && (
          <UploadProducts fetchData={fetchAllProduct} onClose={()=>setOpenUploadProducts(false)}/>
        )
      }
     
    </div>
  </>
}

export default AllProducts