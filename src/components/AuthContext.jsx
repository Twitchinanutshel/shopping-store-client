import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [userId, setUserId] = useState("");
  

  useEffect(() => {
    axios
      .get("https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setLoginStatus(response.data.user[0].username);
          setUserId(response.data.user[0].user_id)          
        } else {
          setIsLoggedIn(false);
          setLoginStatus("");
          setUserId("");
        }
      })
      .catch((err) => console.error("Error checking session:", err));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginStatus, setLoginStatus, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
