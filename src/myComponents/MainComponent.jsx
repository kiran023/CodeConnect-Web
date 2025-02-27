import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from "react-router-dom";
import Footer from './Footer';
import axios from 'axios';
import { BASEURL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/usersSlice';

const MainComponent = () => {
  const userData=useSelector(store=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleUserCheck=async()=>{
      // if(userData!=null) return;
      try{
          const user=await axios.get(BASEURL+'/profile',{withCredentials:true});
          dispatch(addUser(user.data));
      }
      catch(err){
          if(err.response && err.response.status === 401)
          navigate("/login")
        console.log(err);
      }
  }

  
  useEffect(()=>{
    // console.log("useEffect triggered");
    handleUserCheck();
  },[]);
    

  return (
    <>
    {/* <div className="flex flex-col min-h-screen"> */}
    <Navbar/>
    <Outlet/>
    <Footer/>
    {/* </div> */}
    
    </>
  )
}

export default MainComponent