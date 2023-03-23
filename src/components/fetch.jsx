import axios from "./axios";
import { useEffect, useState } from "react";


function useFetch(url){

const [data,setdata] = useState(null)
const [error,seterror] = useState(false)
const [load,setload] = useState(true)


useEffect(()=>{
  // const responce = axios.get(url).then(res=> console.log)

async function dofetch(){
  try{
    // console.log(url,'URL')
    const responce = await axios.get(url)
    if(responce.data){
    setdata(responce.data)
    seterror(false);
    setload(false)
    }
    else{
      throw error('error')
    }
    
  }
  catch(error){
    // setdata(null);
    setload(false);
    seterror(true)
  }
} 
  url && dofetch()
  
},[url])

  return [data,error,load]
}

export default useFetch;