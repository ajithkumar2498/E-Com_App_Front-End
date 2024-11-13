const url = `https://api.cloudinary.com/v1_1/dfr7ofa4a/image/upload`
// const url = `https://res.cloudinary.com/dfr7ofa4a/image/upload/ecom/`

const UploadImage = async(image) => {
      
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset","ecom_product")
    console.log(image)
    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })
   
  return dataResponse.json()
}

export default UploadImage