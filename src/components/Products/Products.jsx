import React, { useEffect, useState } from 'react'
import './Products.scss'
import Card from '../Home/Card/Card'
import useFetch from '../fetch'
import { useNavigate, useSearchParams } from 'react-router-dom'


function Products() {

const banner = [
                "https://images.pexels.com/photos/1049317/pexels-photo-1049317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1549280/pexels-photo-1549280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/39369/baby-teddy-bear-cute-39369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/313719/pexels-photo-313719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              ]

// fetch
const navigate = useNavigate()
const [selectedSubCats, setSelectedSubCats] = useState(null);
const [order,setorder] = useState(0)
const [maxprice,setmaxprice] = useState(50000)
const [searchParams] = useSearchParams();
useEffect(() => {
  let filter = ''
  for (const entry of searchParams.entries()) {
    filter = filter + entry[0]+'='+entry[1]+'&'
  }
  setSelectedSubCats(filter)
}, [searchParams]);

 function handleChange(e){
  const value = e.target.value;
  const isChecked = e.target.checked;
  setSelectedSubCats(isChecked ? selectedSubCats + 'category=' + value + '&' : selectedSubCats.replace('category='+ value + '&', ''))
}

useEffect(()=>{
  selectedSubCats && navigate('/products?' + selectedSubCats.substring(0,selectedSubCats.length-1) )
},[selectedSubCats])

const [data,error,load] = useFetch(selectedSubCats && `/products?${selectedSubCats}`)

useEffect(()=>{
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (selectedSubCats.includes(checkboxes[i].name)){
      checkboxes[i].checked = true;
    }
    else{
      checkboxes[i].checked = false;}
  }
  var radio = document.querySelectorAll('input[type="radio"]');
  for (i = 0; i < radio.length; i++) {
    radio[i].checked = false;}
},[selectedSubCats])

// price sorting

if (order === 1){
  data.sort((a,b)=> a.price- b.price )
}
else if (order === 2) {
data.sort((a,b)=> b.price- a.price )
}

//set categories
let sorts,imag
if (selectedSubCats?.includes('Men')){ sorts = ["Shirts","T-shirts","Jackets","Jeans","Trousers"] ; imag = 0} 
else if(selectedSubCats?.includes('Women')){ sorts = ["Tops","Jumpsuits","Jackets","Jeans","Skirts"] ; imag = 1}
else if(selectedSubCats?.includes('Children')){sorts = ["Tops","Jumpsuits","Jackets","Jeans","Skirts"] ; imag = 2}
else if(selectedSubCats?.includes('Accessories')){ sorts = ["Watches","Ties","Belts","Shoes","Sunglasses"] ; imag = 3}
else if(selectedSubCats?.includes('clothing')){sorts = ["Shirts","T-shirts","Tops","Jumpsuits","Jackets","Jeans","Trousers","Skirts"] ; imag = 4}

  return (
    <>
    {load && <div className="loading"><p>loading</p></div>}
    
    {error && <div className="error"><p>Network Error. Please Try Reloading The Page.</p></div>}
    

    <div className="products">
      <div className="left">
        <div className="filteritem">
          <h1>Product Categories</h1>
          {sorts?.map((item,id) => <div className="inputitem" key={id} ><input type="checkbox" onClick={handleChange} id={item} value={item} name={item} /><label htmlFor={item}>{item}</label></div>)}
          </div>
        <div className="filteritem">
          <h1>Filter by price</h1>
          <div className="inputitem"><p>0</p><input type="range" min={0} max={50000} value={maxprice} onChange={(e)=>{setmaxprice(e.target.value)}}/><p>{maxprice}</p></div>
        </div>
        <div className="filteritem">
          <h1>Sort by</h1>
          <div className="inputitem"><input type="radio" name="radio" id="4" onChange={()=>setorder(1)}  /><label htmlFor="4" >Price(Lowest first)</label></div>
          <div className="inputitem"><input type="radio" name="radio" id="5" onChange={()=>setorder(2)} /><label htmlFor="5" >Price(Highest first)</label></div>
        </div>
      </div>
      {
      data &&
      <div className="right">
        <div><img className='catimg' src={banner[imag]} alt="" /></div>
        <div className='contain'>
            {
            data?.filter(item => maxprice>item.price)
            .map((item,id) => {return(<Card product={item} key={id} />)})
            }
        </div>
      </div>
    }
    </div>
    </>
  )
}

export default Products