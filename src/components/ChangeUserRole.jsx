import React, { useState } from 'react'
import Role from '../common/role'
import { IoMdCloseCircleOutline } from "react-icons/io";
import SummaryAPI from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
  name,
  email,
  role,
  onClose,
  userId,
  callFunc
}) => {

  const [userRole,setUserRole] = useState(role)

  const handleOnChangeSelect = (e)=>{
      setUserRole(e.target.value)
  }

  const updateUserRole = async ()=>{
         const fetchResponse = await fetch(SummaryAPI.updateUser.url,{
          method:SummaryAPI.updateUser.method,
          withCredentials : true,
          headers:{
            "content-type":"application/json"
          },
          body: JSON.stringify({
                 userId: userId,
                 role:userRole,
          })
         })

         const data = await fetchResponse.json()
   
         if(data.success){
          toast.success(data.message)
          callFunc()
          onClose()
         }

  }

  return <>
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full z-10  h-full flex justify-center items-center bg-slate-200 bg-opacity-60'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
          
          <button className='block ml-auto' onClick={onClose}>
              <IoMdCloseCircleOutline />
          </button>
          
           <h1 className='pb-4 text-lg font-medium'>change User Role</h1>
             
             <p>Name: {name}</p>
             <p>Email: {email}</p>
             <div  className='flex items-center justify-between my-4'>
             <p>Role:</p>
             <select className='border px-4 py-1' onChange={handleOnChangeSelect} value={userRole}>

               {
                Object.values(Role).map(el=>{
                   return (
                    <option value={el} key={el}>{el}</option>
                   )
                })
               }
                 
             </select>
             </div>
             <button onClick={updateUserRole} className='w-fit mx-auto block p-2 py-1 px-3 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full'>Change Role</button>
        </div>
    </div>
  </>
}

export default ChangeUserRole
