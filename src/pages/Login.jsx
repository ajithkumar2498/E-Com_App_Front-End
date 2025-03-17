import {useContext, useState} from 'react'
import loginicon from '../assets/signin1.gif'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {fetchUserDetails, fetchUserAddToCart } = useContext(Context)
    

    const [data, setData] = useState({
        email:"",
        password:""
    })
    const handleOnChange = (e)=>{
        const {name, value} = e.target

        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryAPI.SignIn.url,{
            method: SummaryAPI.SignIn.method,
            credentials: 'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const data1 = await dataResponse.json()
        if(data1.success){
            sessionStorage.setItem("token", data1.data)
            console.log("Token stored:", data1.data);
            toast.success(data1.message)
            await new Promise((resolve) => setTimeout(resolve, 300));
            fetchUserDetails()
            fetchUserAddToCart()
            navigate('/')
        }
        if(data1.error){
            toast.success(data1.error)
        }
       
    }
  return <>
    <section id='login'>
        <div className="mx-auto container p-4">
            
            <div className="bg-gradient-to-r from-yellow-400 to-blue-400 p-7 w-full max-w-md mx-auto">
                     <div className='w-20 h-20 mx-auto'>
                        <img src={loginicon} alt='login icon'/>
                     </div>
                     <form  className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2 '>
                                 <input 
                                 type="email" 
                                 placeholder='Enter Your Email' 
                                 name='email'
                                 value={data.email}
                                 onChange={handleOnChange}
                                 className='w-full h-full bg-transparent outline-none ' />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showPassword ? "text" : "password"} 
                                placeholder='Password'  
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full h-full bg-transparent outline-none  ' />
                                <div className="cursor-pointer pt-1 text-lg transition-smooth" onClick={()=> setShowPassword((prev)=>!prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaRegEye />
                                            )
                                            :
                                            (
                                                <FaRegEyeSlash/> 
                                            )
                                        }  
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block pt-4 w-fit ml-auto hover:underline hover:text-red-600'>forgot password</Link>
                        </div>
                        <button className='bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                     </form>
                     <p className='my-6'>Dont't have a Account ? <Link to={'/sign-up'} className='w-fit text-red-600 hover:underline'> sign-up here</Link></p>
            </div>
        </div>


    </section>
  </>
}
