import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './CartCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import { Add, userr } from '../../features/counter/counterSlice'

function CartCard(props) { 
  
const dispatch = useDispatch()
const user = useSelector(userr)
const [load,setload] =useState(false)
const [error,seterror] =useState(false)

  async function ProductRemoved(varient){
    try{
    setload(true);
    const updated = await axios.post('/delete',{id : user.id, product_id : props.data.id , varient})
    dispatch(Add(updated.data));
    setload(false);
    seterror(false);
    }
    catch(error) {
      seterror(true)
    }
  }

  async function Addanddelete(varient){
    try{
      setload(true);
      await axios.post('/delete',{id : user.id, product_id : props.data.id , varient})
      const updated = await axios.post('/wishlist',{id : user.id, product : {id : props.data.id , info : props.data.info}})
      dispatch(Add(updated.data));
      setload(false);
      seterror(false);
      }
      catch(error) {
        seterror(true)
      }
    }
  
  return(
    <>
    {load && <div className="loading"><p>loading</p></div>}
    
    {error && <div className="error"><p>Network Error. Please Try Reloading The Page.</p></div>}

    {props.data.varient.map( (item,id) => { return(
    <div className='cartcard' key={id}>
      <div className='main'>
        <div className='img'>
            <NavLink  to={`/product/${props.data.id}`}><img src={props.data.info.image} alt="" /></NavLink>
        </div>
        <div className='info'>
            <NavLink to={`/product/${props.data.id}`}><p className='brand'>{props.data.info.brand}</p></NavLink>
            <NavLink to={`/product/${props.data.id}`}><p className='title'>{props.data.info.title}</p></NavLink>
            <p>Size: {item.size}</p>
            <p>Qty: {item.quantity}</p>
        </div>
        <div className="cost">
            {props.data.info.oldprice && <p className="saving">Savings: ₹{(props.data.info.oldprice-props.data.info.price)*item.quantity}</p>}
            <p className='price'>₹{props.data.info.price*item.quantity}</p>
        </div>
      </div>
      <div className='functions'>
        <p onClick={()=>ProductRemoved(item)}>Remove</p>
        <p onClick={()=>{Addanddelete(item)}}>Move to Wishlist</p>
      </div>
    </div>
  )})}
  </>
  )}

export default CartCard