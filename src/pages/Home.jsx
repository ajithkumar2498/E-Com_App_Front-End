import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>

    <CategoryList/>
    <BannerProduct/>

    <HorizontalProductCard heading={"Airpodes"} category = {"airpodes"}/>
    <HorizontalProductCard heading={"popular earphones"} category = {"earphones"}/>
    
    <VerticalProductCard heading={"Top Selling Mobiles"} category = {"mobiles"}/>
    <VerticalProductCard heading={"Best Mobiles"} category = {"mouse"}/>
    <VerticalProductCard heading={"Spot your Best Cameras & Accessories"} category = {"camera"}/>
    <VerticalProductCard heading={"Best TWS"} category = {"tws"}/>
    <VerticalProductCard heading={"Neckbands"} category = {"neckband"}/>
    <VerticalProductCard heading={"Refigerators"} category = {"refrigerator"}/> 
    <VerticalProductCard heading={"Colourful Televisions"} category = {"television"}/>
    <VerticalProductCard heading={"Trimmers"} category = {"trimmers"}/>

    </div>
  )
}

export default Home