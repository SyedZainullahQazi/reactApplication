import React,{createContext,useState} from 'react';

export const AuthContext=createContext();

export default function  AuthProvider(props)
{
    //User Credentials State
    const [userCredentials ,setUserCredentials]=useState(null);

    const loginUser=(id,password)=>
    {
        setUserCredentials({id,password});
    };

    //logout USer
    const logoutUser=()=>
    {
        setUserCredentials(null);
    };
    

    return (
        <AuthContext.Provider value={{loginUser,logoutUser,userCredentials}}>
            {props.children}
        </AuthContext.Provider>
    )

}