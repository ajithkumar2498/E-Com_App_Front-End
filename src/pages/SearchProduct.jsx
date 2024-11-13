import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryAPI from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {

    const query = useLocation()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchSearchProducts = async ()=>{
        setLoading(true)
        const fetchdata = await fetch(SummaryAPI.searchProduct.url + query.search, {
            headers: {
                'Content-Type': 'application/json',
            },
    })

        const dataResponse = await fetchdata.json()
        setLoading(false)
        setData(dataResponse.data)
        console.log("dataresponse", dataResponse)
    }

    useEffect(()=>{
        fetchSearchProducts()
    },[query])


  return <>
     <div className='ontainer mx-auto p-4'>
        {
            loading && (
             <p className='text-lg text-center'>Loading...</p>
            ) 
        }
        <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='bg-white text-center text-lg p-4'>No Data Found</p>
            )
        }


        {
            data.length !=0 && !loading && (
                       <VerticalCard loading={loading} data={data}/>
                    )
        }
     </div>
  </>
}

export default SearchProduct