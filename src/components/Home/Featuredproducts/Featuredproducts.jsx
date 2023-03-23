import React from 'react'
import './Featuredproducts.scss'
import Card from '../Card/Card'
import useFetch from '../../fetch'

function Featuredproducts(props) {

const [data,error,load] = useFetch(`/products?${props.type}=true`)

  return (
    <div>

    {load && <div className="loading"><p>loading</p></div>}

    {error && <div className="error"><p>Network Error. Please Try Reloading The Page.</p></div>}

    { data && 
    <div className='featuredproducts'>
        <div className='top'>
            <h1>{props.type} Products</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ab sequi nobis nulla, exercitationem possimus magni quia vel pariatur animi, quidem minus ullam quasi numquam repellendus quod sed. Ea, quisquam!
            Officiis voluptas.</p>
        </div>
        <div className="bottom">
            {data
              .filter((item,id)=> id<4 )
              .map((item,id) => {return(<Card product={item} key={id} />)})}
        </div>
    </div>}
    </div>
  )
}

export default Featuredproducts