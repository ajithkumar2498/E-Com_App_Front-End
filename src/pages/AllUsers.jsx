import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common'
import moment from 'moment'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { toast } from 'react-toastify';



const AllUsers = () => {
const token = sessionStorage.getItem("token")

const [allUsers, setAllUsers]=useState([])

const [openUpdateRole, setOpenUpdateRole] = useState(false)
const[updateUserDetails, setUpdateUserDetails] =useState({
    name: "",
    email:"",
    role:"",
    _id:""
})

const fetchAllUsers = async()=>{
    const fetchResponse = await fetch(SummaryAPI.allUser.url,{
        method:SummaryAPI.allUser.method,
        credentials:"include",
        headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${token}`
            },
    })

    const dataResponse = await fetchResponse.json()
    if(dataResponse.success){
        setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
        toast.error(dataResponse.error)
    }
    
}

useEffect(()=>{
   fetchAllUsers()
},[])

  return <>
    <div className='pb-4 bg-white'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-blue-950 text-white'>
                     <th>sr.no</th>
                     <th>name</th>
                     <th>email</th>
                     <th>role</th>
                     <th>created date</th>   
                     <th>Action</th> 
                </tr>       
            </thead>
            <tbody className='pb-4 bg-white'>
                {
                    allUsers.map((el,index)=>{
                        return (
                            <tr key={el+index}>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-200, p-2 rounded-full cursor-pointer hover:bg-green-500' 
                                    onClick={()=>{
                                        setOpenUpdateRole(true)
                                        setUpdateUserDetails(el)
                                    }
                                    } >
                                    <FiEdit />
                                    </button>
                                    <button className='bg-green-200, p-2 rounded-full cursor-pointer hover:bg-green-500'><MdDelete />
                                    </button>
                                </td>
                            </tr>
                        )
                    })

                }
            </tbody>
        </table>

        {
             openUpdateRole && (
                <ChangeUserRole
                onClose={()=>setOpenUpdateRole(false)} 
                name = {updateUserDetails.name}
                email = {updateUserDetails.email}
                role = {updateUserDetails.role}
                userId = {updateUserDetails._id}
                callFunc={fetchAllUsers}
                />
             )

        }
    </div>
  
  </>
}

export default AllUsers