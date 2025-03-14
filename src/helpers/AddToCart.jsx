import SummaryAPI from "../common"
import {toast }from "react-toastify"


const addToCart = async (e,id)=>{
  const token = sessionStorage.getItem("token")
  
  e?.stopPropagation()
  e?.preventDefault()

  const response =await fetch(SummaryAPI.addToCartProduct.url,{
    method:SummaryAPI.addToCartProduct.method,
    credentials: 'include',
    headers:{
      "content-type" : "application/json",
      Authorization : `Bearer ${token}`
    },
    body : JSON.stringify(
     { productId : id}
    )
  })


  const responseData = await response.json()
  console.log(responseData)

   if(responseData.success){
    toast.success(responseData?.message)
   }
   if(responseData.error){
    toast.error(responseData?.message)
   }
  
   return responseData

}


export default addToCart