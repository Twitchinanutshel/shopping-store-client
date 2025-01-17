import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { AuthContext } from "../components/AuthContext";

const Login = () => {
  const { setIsLoggedIn, setLoginStatus } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    axios
      .post("https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/login", { username, password }, { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setIsLoggedIn(true);
          setLoginStatus(response.data[0].username);
        }
        setUsername("");
        setPassword("");
      })
      .catch((err) => console.error("Login error:", err));
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>

        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="border rounded px-4 py-2 mb-4"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          required
        />

        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border rounded px-4 py-2 mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          required
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" onClick={login}>Log in</button>

        <div>Not a member? <Link to='/sign-up'>Sign up here</Link></div>
      </div>
    </>
  )
}
export default Login
