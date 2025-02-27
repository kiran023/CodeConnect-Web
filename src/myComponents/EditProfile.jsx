import React, { useEffect, useState } from 'react'
import CardUser from './CardUser';
import axios from 'axios';
import { BASEURL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/usersSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const handleSave = async () => {
    try {
      const updatedUser = await axios.patch(BASEURL + '/profile/edit', {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        about: about,
        photoUrl: photoUrl

      }, { withCredentials: true });
      dispatch(addUser(updatedUser));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000)
      console.log(updatedUser);

    }
    catch (err) {
      setError(err.response.data)
      console.log(err);
    }
  }
  return (
    <>
      <div className='flex flex-row justify-center my-40'>
        <div className="card bg-base-300 w-96 shadow-xl mr-16">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>


            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input type="email" className="input input-bordered w-full max-w-xs" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" className="input input-bordered w-full max-w-xs" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input type="number" className="input input-bordered w-full max-w-xs" onChange={(e) => { setAge(e.target.value) }} value={age} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select className="select select-bordered" onChange={(e) => setGender(e.target.value)} value={gender}>
                <option >Pick one</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo</span>
              </div>
              <input type="text" className="input input-bordered w-full max-w-xs" onChange={(e) => { setPhotoUrl(e.target.value) }} value={photoUrl} />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea className="textarea textarea-bordered h-24" placeholder="eg: I am Software Engineer" onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
            </label>

            <p className='text-sm text-red-600'>{error}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>

        </div>
        <CardUser user={{ firstName, lastName, age, about, gender, photoUrl }} isMyProfile={false} />
      </div>
      {toast && <div className="toast toast-top toast-center">
        <div className="alert bg-green-400">
          <span>Profile Saved Successfully</span>
        </div>
      </div>}

    </>
  )
}

export default EditProfile