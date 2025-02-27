import React from 'react'

const RequestCard = ({request_id, connection, isReview = true,handleReviewRequest }) => {
    // console.log("connections", connection);
    const {firstName, lastName, age, gender, photoUrl, about } = connection;
    
    return (
            <div className="card card-compact bg-base-300 w-1/2 shadow-2xl flex flex-row items-center my-2 p-2">
                <div className="avatar">
                    <div className=" w-24 h-24 rounded-full ">
                        <img src={photoUrl} />
                    </div>
                </div>
                <div className="card-body">
                    <div className='flex'>
                        <h2 className="card-title text-primary">{firstName + " " + lastName}</h2>
                        <h2 className="text-lg text-primary ml-5">{age + " | " + gender}</h2>
                    </div>
                    <p>{about}</p>

                </div>
                {isReview && <div className="card-actions justify-center flex-col py-5 mr-2 -ml-5">
                    <button className="btn btn-secondary text-xs"onClick={() => handleReviewRequest("accepted",request_id)} >Like </button>
                    <button className="btn btn-primary text-xs" onClick={() => handleReviewRequest("rejected",request_id)}>Pass</button>
                </div>}
            </div>
    )
}

export default RequestCard