import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import DisplayCurrency from '../helpers/DisplayCurrency';

const AdminProductCard = ({
    data,
    index,
    fetchData
}) => {

  const [editProduct, setEditProduct] = useState(false)
  return(
    <div className='bg-white p-4 rounded '>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center' >
               <img src={data?.productImage[0]} className='object-fill h-full mx-auto' alt="" key={index}/>
           </div>
           <h1 className='text-ellipsis line-clamp-2 '>{data.productName}</h1>
           <div>
                <p className='font-semibold'>
                    {
                    DisplayCurrency(data?.sellingPrice)
                    }
                </p>
           </div>
           <div className='w-fit ml-auto p-2 cursor-pointer hover:rounded-full text-black hover:bg-blue-600 hover:text-white'onClick={()=>setEditProduct(true)}>
                    <FaRegEdit />
           </div>
        </div>
          


      {
        editProduct && (
          <AdminEditProduct fetchData={fetchData} productData={data} onClose={()=>setEditProduct(false)}/>
        )
      }
      
   </div>


  )
}

export default AdminProductCard