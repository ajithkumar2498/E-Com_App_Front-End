import React, { useState } from 'react'
import loginicon from '../assets/signin1.gif'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import imageToBase64 from '../helpers/imageToBase64'
import SummaryAPI from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [data, setData] = useState({
        email:"",
        name:"",
        password:"",
        confirmpassword:"",
        profilePic:""
    })

     const navigate = useNavigate()

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

        if(data.password === data.confirmpassword){
            const dataResponse= await fetch(SummaryAPI.SignUp.url,{
                method: SummaryAPI.SignUp.method,
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(data)
            })
    
            const data1 = await dataResponse.json()

            if(data1.success){
                toast.success(data1.message)
                navigate('/login')
            }
            if(data1.error){
                toast.error(data1.error)
            }
           
        }else{
            toast.error("Your Pssword & confirm Password is not Matched")
        }
        
    }

    const handleUploadImage = async (e)=>{
      const file= e.target.files[0]

      const imagepic = await imageToBase64(file)
      console.log("file", imagepic)
      setData((prev)=>{
        return {
          ...prev,
          profilePic:imagepic
        }
      })
    } 
  return <>
      <section id='signup'>
        <div className="mx-auto container p-4">
            
            <div className="bg-gradient-to-r from-yellow-400 to-blue-400 p-7 w-full max-w-md mx-auto">
                     <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <form>
                          <label >
                            <div>
                            <img src={data.profilePic || loginicon} alt='login icon'/>
                            </div>
                            <div className='text-xs bg-opacity-80 bg-slate-200 cursor-pointer pt-2 pb-4 text-center absolute bottom-0 w-full'>
                            Upload img
                            </div>
                            <input type="file"  onChange={handleUploadImage}className='hidden'/>
                          </label>
                        </form>
                     </div>
                     <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                     <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2 '>
                                 <input 
                                 type="text" 
                                 required
                                 placeholder='Enter Your Name' 
                                 name='name'
                                 value={data.name}
                                 onChange={handleOnChange}
                                 className='w-full h-full bg-transparent outline-none ' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2 '>
                                 <input 
                                 type="email" 
                                 placeholder='Enter Your Email' 
                                 name='email'
                                 required
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
                                required
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
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showConfirmPassword ? "text" : "password"} 
                                placeholder='Confirm Password'  
                                name='confirmpassword'
                                required
                                value={data.confirmpassword}
                                onChange={handleOnChange}
                                className='w-full h-full bg-transparent outline-none  ' />
                                <div className="cursor-pointer pt-1 text-lg transition-smooth" onClick={()=> setShowConfirmPassword((prev)=>!prev)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
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
                        </div>
                        <button className='bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Signup</button>
                     </form>
                     <p className='my-6'>Already have a Account ? <Link to={'/login'} className='w-fit text-red-600 hover:underline'> Login here</Link></p>
            </div>
        </div>


    </section>
  </>
}

export default SignUp