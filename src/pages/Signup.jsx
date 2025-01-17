import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [isDuplicate, setIsDuplicate] = useState(false);

  const validateInput = () => {
    if (!usernameReg.trim()) {
      return false;
    }
    if (!passwordReg.trim()) {
      return false;
    }
    return true;
  };


  axios.defaults.withCredentials = true;
  function register(e) {
    e.preventDefault();

    if (validateInput()) {
      axios.post('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/user_registration', {
        username: usernameReg,
        password: passwordReg
      }).then((response) => {
        console.log(response);
        if (response.data.message && response.data.message.includes('Duplicate entry')) {
          setIsDuplicate(true);
        } else {
          setIsDuplicate(false);
          setUsernameReg('');
          setPasswordReg('');
        }
      })
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>

        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="border rounded px-4 py-2 mb-4"
          placeholder="Enter your username"
          value={usernameReg}
          onChange={(e) => { setUsernameReg(e.target.value) }}
          required
        />

        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border rounded px-4 py-2 mb-4"
          placeholder="Enter your password"
          value={passwordReg}
          onChange={(e) => { setPasswordReg(e.target.value) }}
          required
        />

        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" onClick={register}>Sign up</button>

        <div>Already a member? <Link to='/log-in'>Log in here</Link></div>
      </div>
      {isDuplicate && (
        <div className="flex justify-center">
          <div className="bg-red-500 text-white px-6 py-2 text-center inline-block rounded">
            Username already in use!
          </div>
        </div>
      )}
    </>
  )
}

export default Signup