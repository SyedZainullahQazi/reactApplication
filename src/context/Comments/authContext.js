import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  // User Stored
  const [userData, setUserData] = useState([
    {
      id: 11,
      name: 'Syed Zainullah Qazi',
      password: 'pakistan12345',
      email: 'syedzainullahqazi@gmail.com',
    },
  ]);

  // Function to update the usersData in Parent
  // in Order To register More Users at Runtime
  const addUserData = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  // Retrieve the user state from localStorage on component mount
  const [userCredentials, setUserCredentials] = useState(() => {
    const storedUserState = localStorage.getItem('userState');
    return storedUserState ? JSON.parse(storedUserState) : null;
  });

  // Save userData to localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, []);

  // Function to save user state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userCredentials));
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
