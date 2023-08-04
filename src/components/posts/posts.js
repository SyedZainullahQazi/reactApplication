import { useContext } from "react";

import { AuthContext } from "../../context/Auth/authContext";
import PostContext from "../../context/Posts/PostContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/posts.css";
import Button from "react-bootstrap/Button";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onClickDeletePost,editPost,commentPostButton} from "../../helper/posts/PostHelper";

export default function Posts(props) {
  //Fetches Post Data From Post Context
  const FetchedDataFromPostContext = useContext(PostContext);
  const postData = FetchedDataFromPostContext.postData;
  const updatePostData = FetchedDataFromPostContext.updatePost;
  const { userCredentials } = useContext(AuthContext);
  const id = userCredentials.id;
  
  //function to conditionally render deletePost Button
  const deletePostButton = () => {
    if (props.dataForPost.userId === id) {
      return (
        <Button onClick={()=>{onClickDeletePost(postData,props.dataForPost.id,updatePostData)}} variant="outline-danger">
          Delete
        </Button>
      );
    }
    return <></>;
  };
  

  

  return (
    <>
    <ToastContainer />
      <div className="row justify-content-center upper-div">
        <div className="wrapping-div col-8 justify-content-center">
          <div className="row justify-content-center">
            <div className="col-8">
              <h3 className="title">Title : {props.dataForPost.title}</h3>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-8">
              <p className="article">Article : {props.dataForPost.body}</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-4">
              <p className="post-id">Post ID : {props.dataForPost.id}</p>
            </div>

            <div className="col-4">
              <p className="user-id">User ID : {props.dataForPost.userId}</p>
            </div>
          </div>

          <div className="row justify-content-center user-control">
            <div className="col-3">{commentPostButton(props.dataForPost,id)}</div>

            <div className="col-2">{editPost(props.dataForPost,id)}</div>

            <div className="col-3">{deletePostButton()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
