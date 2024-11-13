import React, { useEffect, useState } from 'react'
import image1 from "../assets/banner/img1.webp"
import image2 from "../assets/banner/img2.webp"
import image3 from "../assets/banner/img3.jpg"
import image4 from "../assets/banner/img4.jpg"
import image5 from "../assets/banner/img5.webp"
import imageMobile1 from "../assets/banner/img1_mobile.jpg"
import imageMobile2 from "../assets/banner/img2_mobile.webp"
import imageMobile3 from "../assets/banner/img3_mobile.jpg"
import imageMobile4 from "../assets/banner/img4_mobile.jpg"
import imageMobile5 from "../assets/banner/img5_mobile.png"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";




const BannerProduct = () => {
     const[currentImage,setCurrentImage]=useState(0)
    const desktopImage = [
      image1,
      image2,
      image3,
      image4,
      image5,
    ]

    const mobileImages = [
        imageMobile1,
        imageMobile2,
        imageMobile3,
        imageMobile4,
        imageMobile5
    ]

    const nextImage = ()=>{
      if(desktopImage.length - 1 > currentImage){
        setCurrentImage(prev => prev+1)
      }
             
    }

    const prevImage = ()=>{
       if(currentImage != 0){
        setCurrentImage(prev => prev-1)
       }     
    }

    useEffect(()=>{
       const interval =setInterval(()=>{
        if(desktopImage.length - 1 > currentImage){
          nextImage()
        }else{
          setCurrentImage(0)
        }
       },7000)

       return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='md:h-72 h-56 w-full bg-slate-200 relative'>
           
            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl' >
                    <button onClick={prevImage} className='bg-white p-1 shadow-md rounded-full'>
                      <FaAngleLeft />  
                    </button>
                    <button onClick={nextImage} className='bg-white p-1 shadow-md rounded-full'>
                      <FaAngleRight />
                    </button>
                </div>
            </div>

              {/* {Desktop  Version} */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImage.map((img,index)=>{
                            return(
                                <div className='w-full min-w-full min-h-full  h-full transition-all' key={img} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                   <img src={img} alt="" className='w-full h-full'/>
                                </div>
                            )
                        })
                    }
             </div>

            {/* {Mobile Version} */}
              <div className='md:hidden flex h-full w-full overflow-hidden'>
                {
                        mobileImages.map((img,index)=>{
                            return(
                                <div className='w-full min-w-full min-h-full  h-full transition-all' key={img} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={img} alt="" className='w-full h-full object-cover'/>
                                </div>
                            )
                        })
                    }
              </div>
               
        </div>
    </div>
  )
}

export default BannerProduct