import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Card.scss'

function Card(props) {

  const navigate = useNavigate()

  return (
        <div  className='card' onClick={()=>{navigate(`/product/${props.product.id}`)}}>
          <div className="image">
            {props.product.exclusive && <span>Exclusive</span>}
            <img className='main' src={props.product.images[0]} alt="" />
            {props.product.images[1] && <img src={props.product.images[1]} alt="" />}
          </div>
            <p className="brand">{props.product.brand}</p>
            <p className='title'>{props.product.title}</p>
          <div className='prices'>
            <p className='new'>₹{props.product.price}</p>
            {props.product.oldprice && <p className='old'>₹{props.product.oldprice}</p>}
            <p>{props.product.oldprice && <span className='discount'>{Math.round(100*((props.product.oldprice-props.product.price)/props.product.oldprice))}% off</span>}</p>
          </div>
        </div>
  )
}

export default Card
