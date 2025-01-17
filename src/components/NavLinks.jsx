import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from 'axios'

const NavLinks = () => {
  const { isLoggedIn, loginStatus, setLoginStatus } = useContext(AuthContext);

  const handleSignOut = () => {
    axios.post('https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/logout', {}, { withCredentials: true })
      .then((response) => {
        setLoginStatus('');
        console.log(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <>
      <div className="flex gap-2 m-2 items-center">
        <Link className="bg-gray-500 px-6 py-2 text-white rounded" to='/'>Go home</Link>
        {isLoggedIn ? (
          <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" to={`/${loginStatus}`}>Hello, {loginStatus}!</Link>
        ) : (
          <>
            <Link className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" to="/sign-up">Sign up </Link>
            <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" to="/log-in">Log in</Link>
          </>
        )}
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="bg-red-500 px-6 py-2 text-white rounded">Sign out</button>
        ) : null}
        {isLoggedIn ? <Link className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600" to={`/${loginStatus}/cart`}>My Cart</Link> : <h1 className="font-semibold">Please log in to see cart</h1>}
      </div>

      <Outlet />
    </>
  );
};

export default NavLinks;
