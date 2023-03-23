import React, { useEffect , useState } from 'react'
import './Product.scss'
import { AlertCircle, ChevronDown , ShoppingBag, ShoppingCart } from 'react-feather'
import useFetch from '../fetch'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Add, userr } from '../../features/counter/counterSlice'
import axios from '../axios'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Product() {
const navigate = useNavigate()
const dispatch = useDispatch()
const user = useSelector(userr)
const varient = ['XS','S','M','L','XL'];
const description = [<p>Extra Small <span>(XS)</span></p>,<p>Small <span>(S)</span></p>,<p>Medium <span>(M)</span></p>,<p>Large <span>(L)</span></p>,<p>Extra Large <span>(XL)</span></p>];
const [sizetext, setsizetext] = useState('Select Size');
const [size,setsize] = useState(null)
const [selectsize,setselectsize] = useState(false)

const {id} = useParams();
const [image,setimage] = useState(0);
const [quantity,setquantity]  = useState(1);
const [data,error,load] = useFetch('/product/'+id);

//cart---------------------------------------------------------------------------------------

const [cartload,setcartload] = useState(false)
const [carterror,setcarterror] =useState(false)
const [gotocart,setgocart] = useState(false)

// async function Addedtocart(){
//   try{
//     const cartdata = { id : user.id , product : { id , varient : {size,quantity} , info : { brand : data.brand , title : data.title , image : data.images[0] , price : data.price , oldprice : data.oldprice}}}
//     setcartload(true);
//     const updateuser = await axios.post('/cart',cartdata);
//     dispatch(Add(updateuser.data));
//     setcartload(false);
//     setgocart(true);
//     setcarterror(false);
//     }
//     catch(error) {
//       setcarterror(true)
//     }
// }

//wishlist-----------------------------------------------------------------------------------
// console.log(user?.wishlist);
// console.log(id);
const [Inwishlist,setInwishlist] = useState(false)
useEffect(() => {
user?.wishlist.map(item =>{ if (item.id === id){ setInwishlist(true) }})
}, [user])


async function update(url){
  let senddata
  if(url === '/cart'){
      senddata = { id : user.id , product : { id , varient : {size,quantity} , info : { brand : data.brand , title : data.title , image : data.images[0] , price : data.price , oldprice : data.oldprice}}}
  }
  else if(url === '/wishlist'){
      senddata = {id : user.id, product : {id , info : { brand : data.brand , title : data.title , image : data.images[0] , price : data.price , oldprice : data.oldprice}}}
  }
  else if(url === '/deletewish'){
      senddata = {id : user.id, product : id }
  }
    try {
    setcartload(true);
    const updated = await axios.post(url,senddata)
    dispatch(Add(updated.data));
    setcartload(false);
    setcarterror(false);
    (url === '/cart')&&setgocart(true)
  } catch (error) {
    setcarterror(true)
  }
  }


// async function Removefromwishlist(){
//   try {
//     setcartload(true);
//     const updated = await axios.post('/deletewish',{id : user.id, product : id })
//     dispatch(Add(updated.data));
//     setcartload(false);
//     setcarterror(false);
//   } catch (error) {
//     setcarterror(true)
//   }
// }

// async function Addtowishlist(){
//   try {
//     setcartload(true);
//     const updated = await axios.post('/wishlist',{id : user.id, product : {id , info : { brand : data.brand , title : data.title , image : data.images[0] , price : data.price , oldprice : data.oldprice}}})
//     dispatch(Add(updated.data));
//     setcartload(false);
//     setcarterror(false);
//   } catch (error) {
//     setcarterror(true)
//   }
// }

  return (
    <div>
    {(load || cartload || !user ) && <div className="loading"><p>loading</p></div>}
    
    {(error || carterror) && <div className="error"><p>Network Error. Please Try Reloading The Page.</p></div>}
    
    { data && 
    <div className='product'>
      <div className="left">
        <div className="array">
          {data.images?.map((img,id) => <img src={img} key={id} alt=""  onClick={()=>setimage(id)}/>)}
        </div>
        <div className="img">
          <img src={data.images[image]}  alt="" />
        </div>
      </div>
        <div className='right'>
          <div className="info">
            <p className='brand'>{data.brand}</p>
            <p className='title'>{data.title}</p>
          </div>
          <div className="price">
            <p className='new'>₹{data.price}</p>
            {data.oldprice && <p className='old'>MRP <span>₹{data.oldprice}</span></p>}
            <p>{data.oldprice && <span className='discount'>({Math.round(100*((data.oldprice-data.price)/data.oldprice))}% OFF)</span>}</p>
          </div>
          {selectsize && 
          <div className="sizeerror"><AlertCircle /><p>Please select a size</p></div>
          }
          <div className='size'>
            {sizetext}
            <div>
              {varient.map((type,id)=> <button key={id} className={type === size ? 'active' : ''} onClick={(e)=>{setsizetext(description[id]);setsize(varient[id]);setselectsize(false);setgocart(false)}}>{type}</button>)}
            </div>
          </div>
          <div className="count">
            <button onClick={()=>{setquantity(pre=>pre>1?pre-1:1)}}>-</button>
            <p>{quantity}</p>
            <button onClick={()=>{setquantity(pre=>pre+1)}} >+</button>
          </div>
          {gotocart ?
          <div className="gotocart" onClick={()=>{navigate('/cart')}}>
            <ShoppingCart/><p>GO TO CART</p>
          </div>
          :
          <div className="addtocart" onClick={()=>{size?update('/cart'):setselectsize(true)}}>
          <ShoppingBag /><p>ADD TO CART</p>
          </div>
          }
          {!Inwishlist ?
          <div className="addtowishlist"  onClick={()=>{update('/wishlist');setInwishlist(true)}}>
            <FavoriteBorderIcon /><p>ADD TO WISHLIST</p>
          </div>
          :
          <div className="addtowishlist"  onClick={()=>{update('/deletewish');setInwishlist(false)}}>
            <FavoriteIcon /><p>REMOVE FROM WISHLIST</p>
          </div>
          }
          {data.description && <div className='details'>
            <p>Product Details</p>
            <ul>
              <div>
                {data.description?.map((info,id) => <li key={id}>{info}</li>)}
              </div>
            </ul>
          </div>}
          <div className="additional">
            <p>More Info</p>
            <ChevronDown />
          </div>
        </div>
    </div>}
    </div>
  )
}

export default Product