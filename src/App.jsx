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



const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  
  const dispatch = useDispatch()

  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async ()=>{
    if (!token) return; // Don't fetch if token is missing

    try {
      const fetchResponse = await fetch(SummaryAPI.current_user.url, {
        method: SummaryAPI.current_user.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const dataApi = await fetchResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
   
  const fetchUserAddToCart = async ()=>{
    if(!token) return; 
    try {
      const fetchResponse = await fetch(SummaryAPI.countAddToCart.url,{
        method: SummaryAPI.countAddToCart.method,
        credentials:'include',
        headers: {
          "Content-Type": "application/json", // Always include this if sending/receiving JSON
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
    })
  
    const dataApi = await fetchResponse.json()
    setCartProductCount(dataApi?.data?.count)
  
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }

  }

  useEffect(()=>{
    if (!token) {
      // Wait for token to be set before fetching
      const interval = setInterval(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      fetchUserDetails();
      fetchUserAddToCart();
    }

  },[token])

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