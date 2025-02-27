import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASEURL } from '../utils/constant';
import RequestCard from './RequestCard';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests=useSelector(store=>store.requests)
    const dispatch=useDispatch();
    const handleRequest=async()=>{
        if(requests.length>0) return;
        try{
            const req=await axios.get(BASEURL+"/user/requests",{withCredentials:true});
            // console.log("hello req",req.data)
            dispatch(addRequest(req.data));
            console.log();
        }
        catch(err){
            console.log(err);
        }
    }

    const handleReviewRequest=async(status,request_id)=>{
        try{
            console.log("sttaus",status,request_id)
        const connect=await axios.post(BASEURL+"/connect/review/"+status+"/"+request_id,{},{withCredentials:true});
        dispatch(removeRequest(connect.data._id));
        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(()=>{
        handleRequest();
    },[])
    if (!requests) return <p className="flex justify-center h-screen my-10">Loading...</p>;
    if (requests.length === 0) return <p className='flex justify-center h-screen my-10'>No requests found</p>

  return (
    <>
    <div  className='flex flex-col w-full justify-center items-center my-40 '>
        {requests && requests.map((request)=><RequestCard key={request._id} request_id={request._id} connection={request.fromUserId} handleReviewRequest={handleReviewRequest} />)
        }
    </div>
    </>
  )
}

export default Requests