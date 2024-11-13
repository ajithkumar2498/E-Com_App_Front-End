import React from 'react'
import logo from '../assets/e-commerce.jpg'

const Logo = ({w,h}) => {
  return <>
    <img src={logo} alt="" height={h} width={w} />
  </>
}

export default Logo