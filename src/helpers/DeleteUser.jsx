import React from 'react'

const DeleteUser = async ({id}) => {
    const fetchResponse  =  await fetch(SummaryAPI.deleteUser.url, {
                method: SummaryAPI.deleteUser.method,
                credentials:"include",
                headers:{
                        "content-type" : "application/json",
                        Authorization : `Bearer ${token}`
                    },
                body: JSON.stringify({
                    userId: id,
             })
            })
        
            console.log("delete response", fetchResponse)

  return
}

export default DeleteUser