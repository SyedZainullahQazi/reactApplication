import React, { createContext, useState, useEffect } from "react";

import {
  setUserDataOnLocalStorage,
  getUserDataFromLocalStorage,
} from "../../utils/Users/usersLocalStorage";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  // User Stored
  const [userData, setUserData] = useState([
    {
      id: 11,
      name: "Syed Zainullah Qazi",
      password: "pakistan12345",
      email: "syedzainullahqazi@gmail.com",
    },
  ]);
  // Function to update the usersData in Parent
  // in Order To register More Users at Runtime
  const addUserData = (updatedData) => {
    setUserData(updatedData);
    setUserDataOnLocalStorage("userData", updatedData);
  };
  // Retrieve the user state from localStorage on component mount
  const [userCredentials, setUserCredentials] = useState(() => {
    let storedUserState = getUserDataFromLocalStorage("userState");
    return storedUserState ? JSON.parse(storedUserState) : null;
  });
  // Save userData to localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      setUserDataOnLocalStorage("userData", userData);
    }
  }, []);
  // Function to save user state to localStorage whenever it changes
  useEffect(() => {
    setUserDataOnLocalStorage("userState", userCredentials);
  }, [userCredentials]);

  const loginUser = (id, password) => {
    setUserCredentials({ id, password });
  };
  // logout User
  const logoutUser = () => {
    setUserCredentials(null);
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        userCredentials,
        userData,
        addUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
