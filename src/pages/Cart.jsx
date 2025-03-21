import React, { useContext, useEffect, useState } from 'react'
import SummaryAPI from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { AiFillDelete } from "react-icons/ai";
import {loadStripe} from '@stripe/stripe-js';



const Cart = () => {
    const token = sessionStorage.getItem("token")
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart =  new Array(context.cartProductCount).fill(null)

    const fetchData = async ()=>{
       
        const response = await fetch(SummaryAPI.viewCart.url,{
            method:SummaryAPI.viewCart.method,
            credentials:"include",
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        })

       

        const responseData = await response.json()
        console.log(responseData)
          
        if(responseData.success){
            setData(responseData.data)
            // setLoading()
        }
        console.log("cart-datA",data)
    }
    const handleLoading = async ()=>{
            await fetchData()
    }
    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])
   
    const increaseQty = async (id,qty)=>{
        const payload = { _id: id, quantity: qty+1 }
       const response = await fetch(SummaryAPI.updateCartProduct.url,{
        method:SummaryAPI.updateCartProduct.method,
        credentials:"include",
        headers:{
            "content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(payload)
       })

       const responseData = await response.json()
       if(responseData.success){
        fetchData()
       }
    }

    const decreaseQty = async (id,qty)=>{
        
        if(qty >= 2){
            const payload = { _id: id, quantity: qty-1 }
            const response = await fetch(SummaryAPI.updateCartProduct.url,{
            method:SummaryAPI.updateCartProduct.method,
            credentials:"include",
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(payload)
           })
    
           const responseData = await response.json()
           console.log(responseData)
           if(responseData.success){
            fetchData()
           }
        }
       
    }

    const deleteCartProduct = async  (id)=>{
            const response = await fetch(SummaryAPI.deleteCartProduct.url,{
            method:SummaryAPI.deleteCartProduct.method,
            credentials:"include",
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({_id:id})
           })
    
           const responseData = await response.json()
           if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
           }
       
    }

    const handlePayment = async ()=>{

       const stripePromise = await loadStripe('pk_test_51QHqESLmNLwepXGiL9wiuwV4xL88C0X3eqr4CJKuhUIGDmlgZwk98xWUMpjhcGPZRy9XKNdTAPFiadnehZQjcfiH001VV5XI7T');
       const response = await fetch(SummaryAPI.payment.url,{
        method:SummaryAPI.payment.method,
        credentials:"include",
        headers:{
            "content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({
            cartItems : data
        })
       })
       const responseData = await response.json()

       if(responseData?.id){
        stripePromise.redirectToCheckout({sessionId:responseData?.id})
       }
       console.log("paymentData",responseData)
      
    }

 const totalQty = data.reduce((prev, curr)=> prev + curr.quantity ,0)
 const totalPrice = data.reduce((prev,curr)=> prev + (curr.quantity * curr?.productId?.sellingPrice), 0)
 return<>
  
   <div className='container mx-auto p-4'>
      <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                        <p className='bg-white py-5'> Nothing on Cart </p>
                )
            }
      </div>
      
      <div className=' flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* // { {View Product in Cart}}  */}
            <div className='max-w-3xl w-full'>
                {
                    loading ?  (
                        loadingCart.map((el,index)=>{
                        return (
                            <div key={index+"add to cart loading"+el} className='w-full bg-slate-200 h-32 my-3 border-slate-300 animate-pulse rounded'>
                        
                            </div>
                        )
                        })
                    
                    ) :(
                       data.map((product,index)=>{
                        return (
                            <div key={product?._id+"cart-items"} className='w-full bg-white h-32 my-3 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                               <div className='w-32 h-32 bg-slate-200'>
                                   <img src={product?.productId?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply'/>
                               </div>
                               <div className='px-4 py-2 relative'>
                                  {/* comment delete cart product */}
                                  <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                       <AiFillDelete/>
                                  </div>
                                  <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                  <p className='capitalize text-blue-300 ' >{product?.productId?.Category}</p>
                                  <div className='flex items-center justify-between'>
                                  <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                  <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                  </div>
                                  <div className=' mt-1 flex items-center gap-3'>
                                    <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>  decreaseQty(product?._id, product?.quantity) }>-</button>
                                    <span>{product?.quantity}</span>
                                    <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white  w-6 h-6 flex justify-center items-center rounded' onClick={()=> increaseQty(product?._id, product?.quantity) }>+</button>
                                  </div>
                               </div>
                            </div>
                        )
                       }))
                }
            </div>

            {/* {SUmmary Products} */}

            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                        ):(
                            <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-blue-600 px-4 py-1'>Summary</h2>
                                    <div  className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>
        
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price:</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>
                                    </div>
        
                                    <button className='bg-blue-600 p-2 mt-2 text-white w-full' onClick={handlePayment}>Payment</button>
                            </div>
                        )
                    }
                    </div>
                )
            }
           
      </div>

    
   </div>
  
  </>
}

export default Cart