import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/constant';
import { removeUser } from '../utils/usersSlice';
import axios from 'axios';

const Navbar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.post(BASEURL + '/logout', { withCredentials: true })
      dispatch(removeUser());
      navigate('/login');
    }
    catch (err) {
      console.log("error:", err);
    }
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">CoCo</Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
        {user && <div className="dropdown dropdown-end mx-6">

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
              <img
                alt="image"
                src={user.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to='/profile' className="justify-between">
                Profile
              </Link>
            </li>
            <li><a onClick={()=>{navigate('/connections')}}>Connections</a></li>
            <li><a onClick={()=>{navigate('/requests')}}>Requests</a></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>}

      </div>
    </div>
  )
}

export default Navbar