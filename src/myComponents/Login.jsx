import React, { useState } from 'react'
import axios from 'axios'
import { BASEURL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/usersSlice"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const user = await axios.post(BASEURL + "/login", {
                email,
                password
            }, { withCredentials: true })
            // console.log(user);
            dispatch(addUser(user.data));
            navigate('/');

        }
        catch (err) {
            if (err.status === 401)
                setError(err.response.data)
            console.log(err);
        }

    }

    const handleSingUp = async () => {
        try {
            const user = await axios.post(BASEURL + "/signup", {
                firstName,
                lastName,
                email,
                password
            }, { withCredentials: true })
            setIsLogin(true);
        }
        catch (err) {
            if (err.status === 401)
                setError(err.response.data)
            console.log(err);
        }

    }

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center my-40'>
                <div className="card card-side bg-base-300 shadow-lg">
                    <div className='card-body'>
                        <div className='flex flex-row '>
                            <figure>
                                <img
                                    src="https://images.unsplash.com/photo-1598988720779-9f0d8057dd5e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Movie"
                                    style={{ width: "330px", height: "330px" }}
                                />
                            </figure>
                            <div className="card-body w-2/3">
                                <p className='text-sm text-red-600'>{error}</p>

                                {!isLogin && <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">First Name</span>
                                        </div>
                                        <input type="text" className="input input-bordered w-full max-w-xs" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Last Name</span>
                                        </div>
                                        <input type="text" className="input input-bordered w-full max-w-xs" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                                    </label>

                                </div>
                                }


                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Email</span>
                                    </div>
                                    <input type="email" className="input input-bordered w-full max-w-xs" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Password</span>
                                    </div>
                                    <input type="password" className="input input-bordered w-full max-w-xs" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                    <div className="label">
                                        {isLogin && <span className="label-text-alt"><a href="">Forgot Password ?</a></span>}
                                    </div>

                                </label>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSingUp}>{isLogin ? 'Login' : 'Sign In'}</button>
                                </div>
                                <p className='mt-2'> {isLogin ? "New to CodeConnect? ":"Already have account? " }<a onClick={()=>{setIsLogin(!isLogin)}}  class="cursor-pointer underline"> {isLogin ? 'Sign Up':'Login'}</a></p>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login