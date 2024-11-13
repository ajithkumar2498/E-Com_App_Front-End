import React, { useEffect, useState } from 'react'
import { Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryAPI from './common';
import Context from './context';
import {useDispatch} from "react-redux"
import { setUserDetails } from './store/userSlice';
import './app.css'


const App = () => {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)
  const fetchUserDetails = async ()=>{
    const fetchResponse = await fetch(SummaryAPI.current_user.url,{
        method: SummaryAPI.current_user.method,
        credentials:'include'
    })

    const dataApi = await fetchResponse.json()

    if(dataApi.success){
       dispatch(setUserDetails(dataApi.data))
    }

    console.log("data-user", dataApi)
  }
   
  const fetchUserAddToCart = async ()=>{
    const fetchResponse = await fetch(SummaryAPI.countAddToCart.url,{
      method: SummaryAPI.countAddToCart.method,
      credentials:'include'
  })

  const dataApi = await fetchResponse.json()
  console.log("cart", dataApi)
  setCartProductCount(dataApi?.data?.count)

  }

  useEffect(()=>{
    /** user Details */
    fetchUserDetails()
     /** user cart Products */
    fetchUserAddToCart()

  },[])
  return<>
   <Context.Provider value={{

    fetchUserDetails, //user details fetch
    fetchUserAddToCart,   // cart count fetch
    cartProductCount, //current user to add product cart count
   }} >
      <ToastContainer 
      position='top-center'
      />
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>

    </Context.Provider>
  </>
}

export default App