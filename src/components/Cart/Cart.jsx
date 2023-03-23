import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userr } from '../../features/counter/counterSlice'
import CartCard from '../CartCard/CartCard';
import './Cart.scss'
import { NavLink } from 'react-router-dom'

function cart() {
    const [charge,setcharge] = useState(false)
    const userdata = useSelector(userr);
    let quantity = 0
    let bagtotal = 0
    let ordertotal = 0

    userdata?.cart.forEach(item =>{
        item.varient?.forEach(varient =>{
          quantity += varient.quantity
          if(item.info.oldprice){
            bagtotal += item.info.oldprice*varient.quantity}
          else{
            bagtotal += item.info.price*varient.quantity
          }
          ordertotal += item.info.price*varient.quantity
        })})

    

  return (
        <>
        {!userdata && <div className="loading"><p>loading</p></div>}
        {
        ordertotal? 
        <>
        {charge &&
        <div className="charge">
            <div className="box">
                <p className="heading">Convenience Fee</p>
                <p className="sub">Delivery Fee</p>
                <p className="about">We charge a delivery fee on orders below 1999 to cover our shipping costs</p>
                <p className="non">Convenience Fee is non-refundable in case you choose to return the order</p>
                <p className="okay" onClick={()=>{setcharge(false)}}>Okay</p>
            </div>
        </div>}

        <div className='cart'>
                <div className="left">
                    <div className="heading">
                        <p>My Bag <span>({quantity} items)</span></p>
                        <NavLink to='/wishlist'>+  <span>Add from Wishlist</span></NavLink>
                    </div>
                    {userdata?.cart.map((item,id) => { return(
                        <CartCard data={item} key={id}/>
                    )})}
                </div>
                <div className="right">
                    <div className="heading">Order details</div>
                    <div className="orders">
                        <p>Bag total</p>
                        <p>₹{bagtotal}</p>
                    </div>
                    <div className="orders">
                        <p>Bag Savings</p>
                        <p>-₹{bagtotal-ordertotal}</p>
                    </div>
                    <div className="orders">
                        <p>Convenience Fee <span onClick={()=>setcharge(true)}>What's this?</span></p>
                    </div>
                    <div className="orders delivery">
                        <p>Delivery Fee</p>
                        {ordertotal>1999?<p>Free <span>₹99.00</span></p>:<p>₹99.00</p>}
                    </div>
                    <div className="orders final">
                        <p>Order Total</p>
                        <p>₹{ordertotal>1999?ordertotal:ordertotal+99 }</p>
                    </div>
                    <div className="proceed">
                        <p>PROCEED TO SHIPPING</p>
                    </div>
                </div>
        </div>
        </>
        :
        <div className="emptycart">
            <h1>Your Shopping Bag is Empty!!</h1>
            {userdata?.wishlist.length>0 && 
            <>
            <div className="wishlist_images">
                {
                    userdata?.wishlist
                    .filter((item,id) => id <3)
                    .map((item,id) => {return(<img src={item.info.image} alt="" key={id} />)})
                }
            </div>
            <NavLink to ='/wishlist' className='addfromwishlist'>ADD FROM WISHLIST</NavLink></>
            }
            <NavLink to='/' className='doshop'>CONTINUE SHOPPING</NavLink>
        </div>
    }
    </>
)}

export default cart

