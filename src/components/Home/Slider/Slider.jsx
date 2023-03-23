import React from 'react'
import { useState } from 'react'
import './Slider.scss'
import { ArrowLeft, ArrowRight } from 'react-feather'
function Slider() {

const [slide,setslide] =useState(0)

function flowleft(){
    setslide((prev) => {return prev === 0 ? -data.length + 1 : prev + 1 })
}

function flowright(){
    setslide((prev) => {return prev === -data.length + 1 ? 0 : prev - 1 })
}

const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto-compress&cs=tinysrgb&w=1600",  
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto-compress&cs-tinysrgb6w=1600",
    "https://images.pexels.com/photos/1163053/pexels-photo-1163053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
]

  return (
    <div className='slider'>
        <div className='contain_img' style={{transform: 'translateX('+slide*100+'vw)',width : data.length*100+'vw'}}>
            {data.map((image,id) => {return(<img key={id}src={image} alt='' />)})}
        </div>
        <div className='arrows'>
            <div onClick={flowleft}><ArrowLeft /></div>
            <div onClick={flowright}><ArrowRight /></div>
        </div>
    </div>
  )
}

export default Slider