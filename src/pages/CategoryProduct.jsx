import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from '../helpers/ProductCategory'
import CategoryWiseProductDiaplay from '../components/CategoryWiseProductDisplay'
import VerticalCard from '../components/VerticalCard'
import SummaryAPI from '../common'

const CategoryProduct = () => {
    const nav = useNavigate()    
    const [data, setData]=useState([])
    const [sortBy,setSortBy] = useState("")
    const [loading, setLoading] = useState(false)
    const location  = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")
    
    const urlCategoryListObject = {}

    urlCategoryListInArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const fetchData = async ()=>{
        const response = await fetch(SummaryAPI.filterProduct.url,{
          method:SummaryAPI.filterProduct.method,
          headers : {
            "content-type" : "application/json"
          },
          body: JSON.stringify({
            category: filterCategoryList
          })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
    }

  const handleSelectCategory = (e)=>{
    const {name,value,checked} = e.target

    setSelectCategory((prev)=>{
      return  {
        ...prev,
        [value] : checked
      }
    })
  }
  
  useEffect(()=>{
    fetchData()
  },[filterCategoryList])

  useEffect(()=>{
     const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){ 
          return categoryKeyName
        }
     }).filter(el=> el)
     setFilterCategoryList(arrayOfCategory)

    // format for url change when change on the check box
     const urlFormat = arrayOfCategory.map((el,index)=>{
      if((arrayOfCategory.length - 1 ) === index){
        return `category=${el}`
      }
        
      return `category=${el}&&`

     })

    nav(`/product-category?${urlFormat.join('')}`)
  },[selectCategory])


   const handleOnChangeSortBy = (e)=>{
    const {value} = e.target
     setSortBy(value)
    if(value == "asc"){
      setData(prev => prev.sort((a,b)=> a.sellingPrice - b.sellingPrice))
    }
    if(value == "dsc"){
      setData(prev => prev.sort((a,b)=> b.sellingPrice - a.sellingPrice))
    }
   }

   useEffect(()=>{
     
   },[sortBy])
  return <>
     {/* // <div>{params.categoryName}</div> */}

     <div className='container mx-auto p-4'>
           {/* desktop version */}
           <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/* *Left Side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                       {/*  sort By */}
                       <div className=' '>
                        <h3 className='text-base uppercase font-medium text-blue-600 text-center pb-1 border-b border-slate-300'> Sort By</h3>
                         <form action="" className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                              <input type="radio" name="sort" checked={sortBy === "asc"} value={"asc"} onChange={handleOnChangeSortBy}/>
                              <label>Price Low - High</label>
                            </div>

                            <div  className='flex items-center gap-3'>
                              <input type="radio" name="sort" value={"dsc"}  checked={sortBy === "dsc"} onChange={handleOnChangeSortBy}/>
                              <label>Price High - Low</label>
                            </div>
                         </form>
                       </div>
                    

                       {/*  filter By */}
                       <div className=' '>
                        <h3 className='text-base uppercase font-medium text-blue-600 text-center pb-1 border-b border-slate-300'> category</h3>
                         <form action="" className='text-sm flex flex-col gap-2 py-2'>
                           {
                            ProductCategory.map((categoryName,index)=>{
                              return (
                                <div key={categoryName.value} className='flex items-center gap-3'>
                                  <input type="checkbox" name={"category"}  checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                              )
                            })
                           }
                         </form>
                       </div>
                </div>

                  {/* *Right Side (product) */}
                  <div className='px-4'>
                    <p className='font-medium text-lg text-black my-2 '>Search Results : {data?.length}</p>
                     <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {                          
                           data.length !=0 && (
                            <VerticalCard data={data} loading={loading}/>
                          )
                        }
                     </div>
                    
                  </div>
           </div>

     </div>
  </>
   
  
}

export default CategoryProduct