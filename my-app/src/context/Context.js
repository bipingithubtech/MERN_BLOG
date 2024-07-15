import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { url } from "../Url";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/refetch", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log("problem in getUser ", err);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
