import React from 'react'
import './Footer.scss'
function Footer() {
  return (
    <div className='footer'>
      <div className='top'>
        <div>
          <h1>Categories</h1>
          <h4>Women</h4>
          <h4>Men</h4>
          <h4>Shoes</h4>
          <h4>Accessories</h4>
          <h4>New Arrivals</h4>
        </div>
        <div>
          <h1>Links</h1>
          <h4>FAQ</h4>
          <h4>Pages</h4>
          <h4>Stores</h4>
          <h4>Compare</h4>
          <h4>Cookies</h4>
        </div>
        <div>
          <h1>About</h1>
          <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum quibusdam ratione vero optio ab, perspiciatis aperiam repellat dolorem! Similique quos laboriosam deleniti quod quo. Illo asperiores deleniti perspiciatis voluptate praesentium?</h4>
        </div>
        <div>
          <h1>Contact</h1>
          <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum quibusdam ratione vero optio ab, perspiciatis aperiam repellat dolorem! Similique quos laboriosam deleniti quod quo. Illo asperiores deleniti perspiciatis voluptate praesentium?</h4>
        </div>
      </div>
      <div className='bottom'>
        <div className='bc'>
          <p className='brand'>Lousy</p><p className='copyrights'>© Copyright 2023. All Rights Reserved </p>
        </div>
        <div>
          <img  className='payments' src="https://content.invisioncic.com/p289038/monthly_2022_10/Payment-methods.png.2b9ba23475aaa15189f555f77ec3a549.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer