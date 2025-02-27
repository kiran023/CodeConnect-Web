import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASEURL } from '../utils/constant'
import RequestCard from './RequestCard';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const handleConnections = async () => {
        try {
            const con = await axios.get(BASEURL + "/user/allConnections", { withCredentials: true });
            console.log(con.data)
            setConnections(con.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleConnections();
    }, [])

    if (connections.length === 0) return <p className='flex justify-center h-screen my-10'>No connections found</p>
    return (
        <>
        <div  className='flex flex-col w-full justify-center items-center my-40 '>
        
        {connections && connections.map((connection)=><RequestCard key={connection._id} connection={connection} isReview={false}/>)}
        </div>
        </>

    )
}

export default Connections