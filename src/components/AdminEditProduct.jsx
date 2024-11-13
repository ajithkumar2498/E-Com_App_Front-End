import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ProductCategory from '../helpers/ProductCategory.jsx';
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from '../helpers/UploadImage.js';
import DisplayImage from './DisplayImage.jsx';
import SummaryAPI from '../common/index.js';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
onClose,
productData,
fetchData
}) => {
  const [data,setData]=useState({
    ...productData,
    productName:productData?.productName,
    BrandName:productData?.BrandName,
    Category:productData?.Category,
    productImage:productData?.productImage || [],
    description:productData?.description,
    price:productData?.price,
    sellingPrice:productData?.sellingPrice

 })

 const handleOnchange = (e)=>{
  const {name, value} = e.target
  setData((prev)=>{
    return{
      ...prev,
      [name]:value
    } 
  })
 }
const [fullScreenImage, setFullScreenImage] = useState("")
const [openFullScreen, setOpenFullScreen] = useState(true)
const handleUploadProduct = async (e)=>{
    const file = e.target.files[0]
    const uploadImageCloudinary = await UploadImage(file)
    setData((prev)=>{
      return{
        ...prev,
        productImage:[...prev.productImage, uploadImageCloudinary.url]
      } 
    })
 }

 const handleDeleteProductImage = async(index)=>{

        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
        setData((prev)=>{
          return{
            ...prev,
            productImage:[...newProductImage]
          } 
        })
 }

// {** Upload Product}

const handleSubmit = async (e)=>{
e.preventDefault()
const fetchResponse = await fetch(SummaryAPI.updateProduct.url, {
  method:SummaryAPI.updateProduct.method,
  credentials:'include',
  headers:{
    "content-type" : "application/json"
  },
  body: JSON.stringify(data)
})

const responsedata = await fetchResponse.json()

if(responsedata.success){
  toast.success(responsedata?.message)
  onClose()
  fetchData()
}

if(responsedata.error){
  toast.error(responsedata?.error)
}
}

  return <>
  
     <div className='fixed flex justify-center items-center bottom-0 top-0 left-0 right-0 '>
     <div className='fixed w-full h-full shadow-black bg-blue-200 bg-opacity-30 bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
           <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
              
              <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg '> Edit Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-700' onClick={onClose}>
                     <IoMdCloseCircleOutline />
                </div>
              </div>
              
              <form action="" onSubmit={handleSubmit} className='grid overflow-y-scroll h-full p-4 gap-2 pb-20'>
                <label htmlFor="productName">Product Name :</label>
                <input 
                type="text" 
                required
                className='p-2 bg-slate-200 border rounded'
                name="productName" 
                id="productName" 
                placeholder='enter product name...' 
                value={data.productName} 
                onChange={handleOnchange} />

                <label htmlFor="BrandName" className="mt-3">Brand Name :</label>
                <input
                required 
                type="text" 
                className='p-2 bg-slate-200 border rounded'
                name="BrandName" 
                id="BrandName" 
                placeholder='enter brand name...' 
                value={data.BrandName} 
                onChange={handleOnchange} />

                <label htmlFor="Category" className="mt-3">Category :</label>
                  <select required value={data.Category} name='Category' onChange={handleOnchange} className='p-2 bg-slate-200 border rounded' id="">
                  <option value={""} >Select Category</option>
                        {
                            ProductCategory.map((el,index)=>{
                                return( 
                                    <option value={el.value} key={el.value+index}>{el.label} </option>
                                )
                            })
                        }
                  </select>
                
                  <label htmlFor="productImage" className="mt-3">ProductImage :</label>
                    <label htmlFor='uploadImageInput'>
                            <div className='p-2 cursor-pointer flex justify-center items-center bg-slate-100 border rounded h-40 w-full'>
                                <div className='text-blue-500 flex justify-center items-center flex-col'>
                                <span className='text-5xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file'id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                                </div>
                            </div>
                   </label>
                   <div>
                   {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                          {
                             data.productImage.map((el, index)=>{
                              return (
                                <div className='relative group'>
                                    <img src={el}  
                                      key={index}
                                      className="bg-slate-100 border cursor-pointer" 
                                      width={90} 
                                      height={90} 
                                      onClick={()=>{
                                        setOpenFullScreen(true)
                                        setFullScreenImage(el)
                                     }} />

                                    <div className='absolute bottom-0 cursor-pointer right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block'
                                    onClick={()=>handleDeleteProductImage(index)}>
                                        <MdDelete />
                                    </div>
                                </div>
                              )
                            })
                          }
                        </div>
                    ) : ( 
                      <p className='text-red-600 text-xs'>*Please Upload Product Image</p>   
                    )
                   }
                   </div>
                   
                <label htmlFor="price" className="mt-3">Price : </label>
                <input 
                type="number" 
                required
                className='p-2 bg-slate-200 border rounded'
                name="price" 
                id="price" 
                placeholder='enter price...' 
                value={data.price} 
                onChange={handleOnchange} />

                <label htmlFor="sellingPrice" className="mt-3">Selling Price :</label>
                <input 
                type="number" 
                required
                className='p-2 bg-slate-200 border rounded'
                name="sellingPrice" 
                id="sellingPrice" 
                placeholder='enter selling price...' 
                value={data.sellingPrice} 
                onChange={handleOnchange} />


                <label htmlFor="description" className="mt-3">Description :</label>
                <textarea 
                row={3} 
                required
                className='h-28 p-1 bg-slate-200 resize-none border rounded'
                name="description" 
                id="description" 
                placeholder='enter product description...' 
                value={data.description} 
                onChange={handleOnchange} >
              </textarea>

                <button className='px-3 py-3 bg-yellow-400 text-black md-5 hover:bg-yellow-600 hover:text-white'>Update product</button>
              </form>
              
           </div>

           {/***  display image fulll screen*/ }
           {
            openFullScreen && (
              <DisplayImage onClose={()=> setOpenFullScreen(false)} imageURL={fullScreenImage}/>
            )
           }

           
     </div>
     </div>
  
  </>
}

export default AdminEditProduct