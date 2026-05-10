import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { removeUser } from './userSlice'
import base_url from "./config"
import userImage from '../public/user2.jpeg'
const Navbar = () => {
    const dispatch = useDispatch()
    const naviate= useNavigate()
    const user = useSelector(store=>store.user)
    
    const handlelogout = async()=>{
    try{  await axios.post(base_url+"/logout",{}, { withCredentials: true })
      dispatch(removeUser())
       naviate("/login")
    }
    catch(err){
         console.log(err.message) 
        
    }
    }
       const handleImageError = (e) => {
          e.target.src = userImage;   
        };
  return (
    <div className="navbar bg-base-300 shadow-sm shadow-gray-800">
  <div className="flex-1 ">
    <a className="btn btn-ghost text-xl bg-base-100" href="/">👩🏻‍💻 DeveloperWorld</a>
  </div>
  <div className="flex gap-2">
   
   {user && <div className="dropdown dropdown-end mr-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="My Profile"
            src={user?.photourl || userImage}  onError={handleImageError}/>
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu gap-2 menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-5  w-auto p-2 items-center shadow">
        <li className=' bg-base-100'>
          <Link to="/profile/view">
            Profile
           
          </Link>
        </li>
        <li className=' bg-base-100'><Link to="/user/connection">Connections</Link></li>
        <li className=' bg-base-100'><Link to="/user/requests/recieved">Requests</Link></li>
        <li className=' bg-base-100'><button onClick={()=>handlelogout()}>Logout</button></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Navbar
