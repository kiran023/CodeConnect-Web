import React from 'react'

const CardUser = ({user,isMyProfile=true,handleSendRequest}) => {
  const {_id,firstName,lastName,age,gender,about,photoUrl}=user;
  console.log("card",user)
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
        <figure >
          <img
            src={photoUrl}
            alt="photo" 
            className="w-full h-full object-cover"
             />
        </figure>
        <div className="card-body">
          <div className='flex justify-between'>
          <h2 className="card-title text-primary">{firstName + " "+ lastName}</h2>
          <h2 className="text-lg text-primary">{ (age? age:" " )+ " | " + (gender? gender:" ")}</h2>
          </div>
          <p className='mt-5' >{about}</p>
          {isMyProfile && <div className="card-actions justify-center mt-5">
            <button className="btn btn-secondary mr-5" onClick={()=>handleSendRequest("interested",_id)}>Like</button>
            <button className="btn btn-primary" onClick={()=>handleSendRequest("pass",_id)}>Pass</button>
          </div>}
          
        </div>
      </div>
  )
}

export default CardUser