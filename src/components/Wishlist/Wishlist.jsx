import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Add, userr } from '../../features/counter/counterSlice'
import './Wishlist.scss'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from '../axios'

function Wishlist() {
  const navigate  = useNavigate()
  const userdata = useSelector(userr)
  const dispatch = useDispatch()
  const [cartload,setcartload] = useState(false)
  const [carterror,setcarterror] =useState(false)

async function Deleteitem(id,e){
   if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  try {
    setcartload(true);
    const updated = await axios.post('/deletewish',{id : userdata.id, product : id });
    dispatch(Add(updated.data));
    setcartload(false);
    setcarterror(false);
  } catch (error) {
    setcarterror(true);
  }
}
    
  return (
    <>
    {(cartload || !userdata) && <div className="loading"><p>loading</p></div>}
    
    {carterror && <div className="error"><p>Network Error. Please Try Reloading The Page.</p></div>}
    {
    userdata?.wishlist.length>0 ?
    <div className="wishlist">
      <div className="heading"><p>Your Wishlist</p></div>
      <div className="array">
        {
          userdata?.wishlist?.map(item => {return(
        <div  className='card' key={item.id} onClick={()=>{navigate(`/product/${item.id}`)}}>
          <div className="image">
            <img className='main' src={item.info.image} alt="" />
            <div className="deleteicon" onClick={(e)=>{Deleteitem(item.id,e)}}><DeleteOutlineIcon /></div>
          </div>
            <p className="brand">{item.info.brand}</p>
            <p className='title'>{item.info.title}</p>
          <div className='prices'>
            <p className='new'>₹{item.info.price}</p>
            {item.info.oldprice && <p className='old'>₹{item.info.oldprice}</p>}
            <p>{item.info.oldprice && <span className='discount'>{Math.round(100*((item.info.oldprice-item.info.price)/item.info.oldprice))}% off</span>}</p>
          </div>
        </div>
          )})
        }
        </div>
    </div>
    :
    <div className='emptywishlist'>
            <h1>Your Wishlist is Empty</h1>
            <NavLink to='/' className='doshop'>CONTINUE SHOPPING</NavLink>
    </div>
    }
    </>
  )
}

export default Wishlist