import {CommentGetItemsLocalStorage,CommentSetItemsLocalStorage,} from "../utils/Comments/commentLocalStorage";

export const CommentsAPI=async(stateData)=> {
    try {
      const storedComments = CommentGetItemsLocalStorage(stateData.postid);
  
      if (storedComments) {
        return JSON.parse(storedComments);
      } else {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/"+(stateData?stateData.postid:"")+"/comments");
        const dataFetched = await response.json();
  
        // Store the fetched data in localStorage
        CommentSetItemsLocalStorage(stateData.postid, dataFetched);
        return dataFetched;
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      return null;
    }
  }
  