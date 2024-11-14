const backendDomain ="https://e-com-app-back-end.onrender.com"
const SummaryAPI = {
   SignUp : {
     url: `${backendDomain}/api/users/signup`,
     method: "post"
   },
   SignIn: {
    url:`${backendDomain}/api/users/signin`,
    method: "post"
   },
   current_user:{
    url:`${backendDomain}/api/users/user-details`,
    method:"get"
   },
   Logout:{
    url:`${backendDomain}/api/users/user-logout`,
    method:"get"
   },
   allUser:{
    url:`${backendDomain}/api/users/all-users`,
    method:"get"
   },
   updateUser:{
    url:`${backendDomain}/api/users/update-user`,
    method:"post"
   },
   uploadProduct:{
    url:`${backendDomain}/api/products/upload-product`,
    method:"post"
   },
   allProducts:{
    url:`${backendDomain}/api/products/all-products`,
    method:"get"
   },
   updateProduct:{
     url:`${backendDomain}/api/products/update-product`,
     method:"post"
   },
   categoryProducts:{
    url:`${backendDomain}/api/products/get-categoryProduct`,
     method:"get"
   },
   categoryWiseProducts:{
    url:`${backendDomain}/api/products/category-products`,
     method:"post"
   },
   productDetails:{
      url:`${backendDomain}/api/products/product-details`,
      method:"post"
   },
   addToCartProduct:{
      url:`${backendDomain}/api/users/add-to-cart`,
      method:"post"
   },
   countAddToCart:{
     url:`${backendDomain}/api/users/cart-count`,
      method:"get"
   },
   viewCart:{
    url:`${backendDomain}/api/users/view-cart`,
     method:"get"
  },
  updateCartProduct:{
     url:`${backendDomain}/api/users/update-cart-product`,
     method:"post"
  },
  deleteCartProduct:{
    url:`${backendDomain}/api/users/delete-cart`,
    method:"post"
 },
 searchProduct:{
      url:`${backendDomain}/api/products/search`,
      method:"get"
 },
 filterProduct:{
   url:`${backendDomain}/api/products/filter-products`,
      method:"post"
 },
 payment:{
   url:`${backendDomain}/api/payments/checkout`,
      method:"post"
 },
 getOrder:{
   url:`${backendDomain}/api/payments/order-list`,
   method:"get"
 },


}

export default SummaryAPI