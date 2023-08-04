import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

import {CommentSetItemsLocalStorage} from "../../utils/Comments/commentLocalStorage.js";

import 'react-toastify/dist/ReactToastify.css';
import Button from "react-bootstrap/Button";

export const onClickDeletePost=(postData,id,updatePostData)=> {
  const index = postData.findIndex(
    (element) => element.id === id
  );

  if(index!==-1)
  { 
    const deletedPost = postData[index];
    const deletedPostId = deletedPost.id;
    CommentSetItemsLocalStorage(deletedPostId, []);
  }

  toast.success("Post Deleted");
  const updatedArray = [...postData];
  updatedArray.splice(index, 1);
  updatePostData(updatedArray);
}

export const editPost = (dataForPost,id) => {
  if (dataForPost.userId === id) {
    return (
      <Link to="/edit-post" state={dataForPost}>
        <Button variant="outline-info">EDIT</Button>
      </Link>
    );
  }
  return <></>;
};

  export const commentPostButton = (dataForPost,id) => {
    return (
      <Link to="/comments" state={{ postid: dataForPost.id, userid: id }}>
        <Button variant="outline-info">Comments</Button>
      </Link>
    );
  };
  