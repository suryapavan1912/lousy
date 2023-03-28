import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Heart, Search , ShoppingCart , User } from 'react-feather';
import './Navbar.scss'
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { userr } from '../../features/counter/counterSlice';

function Navbar() {
const navigate = useNavigate()
const userdata = useSelector(userr)
let quantity = 0

userdata?.cart?.forEach(item =>{
  item.varient?.forEach(varient =>{
    quantity += varient.quantity
  })})

  return (
      <div className='nav'>
        <div className='left'>
        <NavLink to='/'><p>LOUSY</p></NavLink>
        </div>
        <div className='right'>
          <NavLink to='/products?type=clothing&gender=Men'>Men</NavLink>
          <NavLink to='/products?type=clothing&gender=Women'>Women</NavLink>
          <NavLink to='/products?type=Beauty'>Beauty</NavLink>
          <NavLink to='/products?type=Accessories'>Accessories</NavLink>
          <div className='icons'>
            <div className='signout'>
              <User />
              <div className="dropdown">
                <p onClick={()=>{auth.signOut();navigate('/')}}>Sign out</p>
              </div>
            </div>
            <NavLink to='/wishlist'><Heart /></NavLink>
            <div className='divcon'>
              <NavLink to='/cart'><ShoppingCart /></NavLink>
              <p style={{display : quantity?'flex':'none'}}>{quantity}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar