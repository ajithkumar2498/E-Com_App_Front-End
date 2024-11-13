import SummaryAPI from "../common"


const fetchCategoryWiseProduct = async (Category) =>{
    const response = await fetch(SummaryAPI.categoryWiseProducts.url,{
        method:SummaryAPI.categoryWiseProducts.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            Category:Category
        })
    })

    
    const dataResponse =await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct