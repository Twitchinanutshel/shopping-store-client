import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

export const UserPage = () => {
  const { loginStatus } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`https://shopping-store-noahgauci-6582ee8ede9e.herokuapp.com/users/${username}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div>
      {data.map((user) => (
        <div key={user.user_id}>
          Hello {user.username}
        </div>
      ))}
    </div>
  );
};

export default UserPage