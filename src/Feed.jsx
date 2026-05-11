import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import base_url from './config';
import { addfeed } from './feedSlice';
import UserCard from './userCard';

const Feed = () => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed)

  const getfeed = async () => {
    try {
      if(feed && feed.length > 0){
        setLoading(false);
        return;
      }

      const data = await axios.get(base_url + "/feed", {
        withCredentials: true
      });

      dispatch(addfeed(data?.data));

    } catch(err){
      console.log(err.message)
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getfeed()
  }, [])

  if(loading){
    return <h1 className='flex justify-center my-12'>Loading users....</h1>
  }

  if(feed.length === 0){
    return <h1 className='flex justify-center my-12'>No new user found</h1>
  }

  return (
    <div className='flex justify-center items-center h-[calc(100vh-128px)]'>
      <UserCard flag={false} data={feed[0]}/>
    </div>
  )
}

export default Feed;