import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './userSlice'
import base_url from './config'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store)=>store.user)
  const getData = async ()=>{
    try{const data = await axios.get(base_url+"/profile/view",{withCredentials:true})
    dispatch(addUser(data.data))}
    catch(err){
     console.log(err.message)
     navigate("/login")
    }
  }
  useEffect(()=>{
    if(!user){
    getData()}
  },[])

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
        </>
  )
}

export default Body
