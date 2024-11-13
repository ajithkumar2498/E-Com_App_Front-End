import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const DisplayImage = ({
    imageURL,
    onClose
}) => {
  return <>
     
     <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
            <div className='bg-white p-4 shadow-lg max-w-5xl mx-auto rounded '>
                <div className='w-fit ml-auto text-2xl hover:text-red-700' onClick={onClose}>
                        <IoMdCloseCircleOutline />
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imageURL} alt="" className='w-full h-full'/>
                </div>
            </div>
     </div>
    

    
  </>
}

export default DisplayImage