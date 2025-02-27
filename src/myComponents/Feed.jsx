import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/constant';
import axios from 'axios';
import { addFeed, removeFeed } from '../utils/feedSlice';
import CardUser from './CardUser';

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFeed = async () => {
    // if (feed.length > 0) return;
    try {
      const feedUsers = await axios.get(BASEURL + '/user/feed', { withCredentials: 'true' });
      console.log("hello feed",feedUsers.data)
      dispatch(addFeed(feedUsers.data));
    }
    catch (err) {
      if (err.response && err.response.status === 401)
        navigate("/login")
      console.log(err);
    }
  }

  const handleSendRequest = async(status, id) => {
    try {
      console.log("sttaus", status, id)
      const connect = await axios.post(BASEURL + "/connect/send/" + status + "/" + id, {}, { withCredentials: true });
      dispatch(removeFeed(connect.data.toUserId));
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // console.log(checkFeed,checkFeed.len);
    handleFeed();
  }, [])


  if(feed.length===0) return <p className='flex justify-center h-screen my-10'>No new user found</p>

  return (
    <div className='w-screen h-screen flex justify-center my-40'>
      {
        feed &&
        <CardUser user={feed[0]} handleSendRequest={handleSendRequest} />
      }
    </div>

  )
}

export default Feed