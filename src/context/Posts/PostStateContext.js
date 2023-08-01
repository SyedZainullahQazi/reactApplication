//Builtin Libraries Imports
import React, { useEffect, useState } from "react";

//Custom File Imports
import PostContext from "./PostContext.js";
import PostsAPI from "../../api/PostAPI.js";
import {
  initializePostDataOnLocalStorage,
  setPostDataOnLocalStorage,
} from "../../utils/Posts/postsLocalStorage.js";

export default function PostStateContext(props) {
  // Check if data exists in localStorage,
  //if not, initialize with an empty array
  const initialData = initializePostDataOnLocalStorage();
  // Creating State Variable to Fetch Post Data
  const [postData, setPostData] = useState(initialData);
  // Using UseEffect Hook To Fetch Data and
  // Update the React Component Only Once
  useEffect(() => {
    async function fetchAndSetData() {
      // Fetch data only if postData is empty
      if (postData.length === 0) {
        const dataFetched = await fetchData();
        if (dataFetched) {
          setPostData(dataFetched);

          // Save fetched data to localStorage
          setPostDataOnLocalStorage(dataFetched);
        }
      }
    }

    fetchAndSetData();
  }, [postData]); // Add postData as a dependency to prevent unnecessary re-fetching

  // updates the PostData and postData inlocalStorage
  const updatePost = (data) => {
    setPostData(data);
    // Save updated data to localStorage
    setPostDataOnLocalStorage(data);
  };

  return (
    <PostContext.Provider value={{ postData, updatePost }}>
      {props.children}
    </PostContext.Provider>
  );
}

async function fetchData() {
  try {
    const response = await PostsAPI();
    const dataFetched = await response.json();
    return dataFetched;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
