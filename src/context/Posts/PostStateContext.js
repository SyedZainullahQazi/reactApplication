import React, { useEffect, useState } from "react";

import PostContext from "./PostContext.js";
import {PostsAPI} from "../../api/PostAPI.js";
import {initializePostDataOnLocalStorage,setPostDataOnLocalStorage,} from "../../utils/Posts/postsLocalStorage.js";

export default function PostStateContext(props) {
  const initialData = initializePostDataOnLocalStorage();
  const [postData, setPostData] = useState(initialData);

  useEffect(() => {
    async function fetchAndSetData() {
      // Fetch data only if postData is empty
      if (postData.length === 0) {
        const dataFetched = await PostsAPI();
        if (dataFetched) {
          setPostData(dataFetched);

          // Save fetched data to localStorage
          setPostDataOnLocalStorage(dataFetched);
        }
      }
    }
    fetchAndSetData();
  }, [postData]);

  const updatePost = (data) => {
    setPostData(data);
    setPostDataOnLocalStorage(data);
  };

  return (
    <PostContext.Provider value={{ postData, updatePost }}>
      {props.children}
    </PostContext.Provider>
  );
}


