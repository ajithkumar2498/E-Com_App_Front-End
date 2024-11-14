import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FiSearch } from "react-icons/fi";
import { FaUserLarge } from "react-icons/fa6";
import { LiaOpencart } from "react-icons/lia";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Role from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector(state=>state?.user?.user)
  console.log("user")
  const dispatch = useDispatch()
  const[menuDisplay, SetMenuDisplay] = useState(false)
  const context = useContext(Context)
  const nav = useNavigate()
  const searchInput = useLocation()
  const URLsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll("q")
  const[search, setSearch]=useState(searchQuery)

  const handleLogout = async ()=>{
       const fetchData = await fetch(SummaryAPI.Logout.url,{
        method:SummaryAPI.Logout.method,
         credentials: 'include'
       })

       const data = await fetchData.json()

       if(data.success){
        toast.success(data.message)
        dispatch(setUserDetails(null))
        nav("/")
       }
       if(data.error){
        toast.error(data.error)
       }
  }

  const handleSearch = (e)=>{
    const {value} = e.target
    setSearch(value)
    if(value){
         nav(`/search?q=${value}`)
    }else{
      nav("/search")
    }

  }
  return <>
    <header className = 'h-16 shadow-lg bg-white fixed w-full z-40'>
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className=''>
          <Link to={'/'}>
            <Logo w={80} h= {50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input type="text" placeholder='Search product here...' className="w-full outline-none" onChange={handleSearch} value={search}/>
          <div className="text-lg min-w-[50px] h-8 bg-blue-400 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>      
             <div className='relative flex justify-center'>
               {
                user?._id && (
                                    
                  <div className=" text-3xl cursor-pointer relative flex justify-center" onClick={()=> SetMenuDisplay(prev=>!prev)}>
                  {
                    user?.profilePic ? (
                    <img src={user?.profilePic} className="w-10, h-10 rounded-full" alt={user?.name}/>
                  ) : (
                    <FaUserLarge />
                    )
                  }  
                  </div>
                )
               }
               {
                  menuDisplay && (
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                    <nav>
                      {
                        user?.role === Role.ADMIN && (
                          <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> SetMenuDisplay(prev=>!prev)}>admin panel</Link>
                        )
                      }
                      <Link to={"/order"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> SetMenuDisplay(prev=>!prev)}> Orders </Link>
                    </nav>
                 </div>
                  )
               }
             
             </div>
             
             {
              user?._id && (
                <Link to={"/cart"} className="text-4xl relative">
                    <span><LiaOpencart /> </span>
                    <div className='bg-blue-300 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2'>
                      <p className='text-sm'>{context?.cartProductCount}</p>
                    </div>
                 </Link>
              )
             }
            
            <div>
              {
                user?._id ? (
                  <button className='px-3 bg-blue-400 py-1 rounded-full text-white hover:bg-yellow-600 hover:shadow-sm' onClick={handleLogout}>Logout</button>
                )
                :(
                  <Link to={'/login'} className='px-3 bg-blue-400 py-1 rounded-full text-white hover:bg-yellow-600 hover:shadow-sm'>Login</Link>
                ) 
              }
            </div>
        </div>

       

      </div>
    </header>
  </>
}

export default Header