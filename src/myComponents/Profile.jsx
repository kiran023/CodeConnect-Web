import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
  let userData=useSelector(store=>store.user);
  return (
    <>
        {userData &&
       <EditProfile user={userData}/>
      }
      
    </>
  )
}

export default Profile