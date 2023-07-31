import React,{useEffect,useState} from "react";
import PostContext from "./PostContext.js"

export default function PostStateContext(props)
{
    //Creating State Variable to Fetch Post Data
    const [postData,setPostData]=useState("");

    //Using UseEffect Hook To Fetch Data and 
    //Update the React Component Only Once
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts").
        then((response)=>response.json()).
        then((dataFetched)=>setPostData(dataFetched));},[]);

    //Creating a Function to Update PostData
    const updatePost=(data)=>
    {
        setPostData(data);
    }


    return (
        <PostContext.Provider value={{postData,updatePost}}>
            {props.children}
        </PostContext.Provider>
    );
}

