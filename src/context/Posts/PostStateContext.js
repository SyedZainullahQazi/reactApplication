import React,{useEffect,useState} from "react";
import PostContext from "./PostContext.js"
import PostsAPI from "../../API/PostAPI.js";

export default function PostStateContext(props)
{
// Check if data exists in localStorage, 
//if not, initialize with an empty array
  const initialData = localStorage.getItem("postData")
  ? JSON.parse(localStorage.getItem("postData"))
  : [];


// Creating State Variable to Fetch Post Data
const [postData, setPostData] = useState(initialData);


// Using UseEffect Hook To Fetch Data and
// Update the React Component Only Once
useEffect(() => {
  // Fetch data only if postData is empty
  if (postData.length === 0) {
    PostsAPI()
      .then((response) => response.json())
      .then((dataFetched) => {
        setPostData(dataFetched);
        // Save fetched data to localStorage
        localStorage.setItem("postData", JSON.stringify(dataFetched));
      });
  }
}, []);


// Creating a Function to Update PostData
//also updates the Post in the localStorage
const updatePost = (data) => {
  setPostData(data);
  // Save updated data to localStorage
  localStorage.setItem("postData", JSON.stringify(data));
};


    return (
        <PostContext.Provider value={{postData,updatePost}}>
            {props.children}
        </PostContext.Provider>
    );
}

