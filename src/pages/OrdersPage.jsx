import React, { useState } from 'react'
import SummaryAPI from '../common'
import { useEffect } from 'react'
import moment from 'moment'
import displayINRCurrency from '../helpers/DisplayCurrency'

const OrdersPage = () => {

  const [data, setData] = useState([])

  const fetchOrderDetails = async ()=>{
    const fetchdata = await fetch(SummaryAPI.getOrder.url, {
      method : SummaryAPI.getOrder.method,
      credentials : "include"
    })

    const responseData = await fetchdata.json()
    setData(responseData.data)
    console.log("order list", responseData)
    console.log('data', data)
     
  }

  useEffect(()=>{

    fetchOrderDetails()
  },[])

  
  return <>
    <div>
      {
        !data[0] && (
          <p>No Orders Available...</p>
        )
      }

      <div className='p-4 w-full'>
        {
          data.map((item, index)=>{
            return (
              <div key={item.userId + index} >
                <p className='font-medium text-lg'>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <div className='border rounded'>

                  <div className='flex flex-col lg:flex-row justify-between'>
                      <div className='grid gap-1'>
                      {
                        item?.productDetails.map((product, index)=>{
                          return (
                            <div key={product.productId + index} className='flex gap-3 bg-slate-100'>
                                <img src={product.image[0]} alt="" className='w-28 h-28 bg-slate-200 object-scale-down p-2'/>
                                <div>
                                  <div className='font-medium text-lg text-ellipsis line-clamp-1'>     {product.name}    </div>
                                  <div className='flex items-center gap-5 mt-2'>
                                    <div className='text-lg text-red-600'>
                                      {displayINRCurrency(product.price)}
                                    </div>
                                    <p>Quantity : {product.quantity}</p>
                                  </div>
                                </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex gap-4 flex-col p-2 min-w-[300px]'>
                      <div>
                        <div className='text-lg font-medium'>Payment Details : </div>
                        <p className='ml-1'>payment Method:  {item.paymentDetails.payment_method_type[0]}</p>
                        <p className='ml-1'>payment Status : {item.paymentDetails.payment_status}</p>
                      </div>
                      <div>
                        <div className='text-lg font-medium'>Shipping Details</div>
                        {
                          item.shipping_options.map((shipping, index)=>{
                            return (
                              <div className='ml-1' key={shipping.shipping_rate}>
                                Shipping Amount : {shipping.shipping_amount}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='font-semibold ml-auto w-fit lg:text-lg min-w-[300px]'>
                    Total Amount : {item.totalAmount}
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
    </div>
  </>
}

export default OrdersPage