import axios from 'axios'
import React from 'react'
import base_url from './config'
import { useDispatch } from 'react-redux'
import { removefeed } from './feedSlice'
import userImage from '../public/user2.jpeg'

const UserCard = ({data, flag}) => {
  const dispatch = useDispatch()
  const handleinterestRequest = async (status,userId)=>{
    try{const res = await axios.post(base_url+"/request/send/" +status+"/"+userId ,{},{withCredentials:true})
  dispatch(removefeed(userId))
  }
  catch(err){
 console.log(err.message)
  }
  }
  const photoUrl = data?.photourl || userImage
  const handleImageError = (e) => {
    e.target.src = userImage;   
  };
  return (
   <div className="card bg-base-300 w-96 rounded-2xl shadow-sm mt-7">
  <figure className='p-8'>
    <img
      src={photoUrl}
          alt={`${data?.first_name || "User"} ${data?.last_name || ""}`}
      alt="user" className='rounded-2xl' onError={handleImageError}/>
  </figure>
  <div className="card-body items-center justify-center">
    <h2 className="card-title">{`${data?.first_name}  ${data?.last_name}` }</h2>

    {data?.age &&<h2 className="card-title">{data?.age}</h2>}
    {data?.gender &&<h2 className="card-title">{data?.gender}</h2>}
    {data?.bio && <h2 className="card-title">{data?.bio}</h2>}
    
   {!flag && <div className="card-actions justify-center mt-2">
        
      <button className="btn btn-primary" onClick={()=>handleinterestRequest("ignored",data?._id)}>Ignore</button>
       <button className="btn btn-secondary" onClick={()=>handleinterestRequest("interested",data?._id)}>Interested</button>
    </div>}
  </div>
</div>
  )
}
export default UserCard
