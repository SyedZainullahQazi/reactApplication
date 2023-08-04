import { useState } from "react";

import {HandleDeleteBtn,HandleEditBtn,HandleUpdateBtn,FindEmail} from "../../helper/comments/CommentHelper"

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/posts.css";
import Button from "react-bootstrap/Button";

export default function Comments(props) 
{
  //Takes the userId from CommentBody
  const userid = parseInt(props.userId);
  const [editFlag, updateEditFlag] = useState(true);
  const [commentBody, setCommentBody] = useState(props.dataForComment.body);
  
  const handleCommentBody = (e) => {
    setCommentBody(e.target.value);
  };

  const deleteComment = () => {
    let userEmail = FindEmail(userid,props.users);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-danger" onClick={()=>{HandleDeleteBtn(props.allComments,props.dataForComment,props.upComments)}}>
          Delete
        </Button>
      );
    }
    return <></>;
  };
  
  //function to conditionally render editPost 
  const editComment = () => {
    let userEmail = FindEmail(userid,props.users);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-info" onClick={()=>{HandleEditBtn(updateEditFlag)}}>
          EDIT
        </Button>
      );
    }
    return <></>;
  };

  //After Pressing Edit Comment, update Comment Button Appears
  const updateComment = () => {
    let userEmail = FindEmail(userid, props.users);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-warning" onClick={()=>{HandleUpdateBtn(props.dataForComment,updateEditFlag,commentBody,props.allComments)}}>
          UPDATE
        </Button>
      );
    }
  };

  const renderCommentText = () => {
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-8">
            <h3 className="title">Name : {props.dataForComment.name}</h3>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <p className="article">Article : {props.dataForComment.body}</p>
          </div>
        </div>
      </>
    );
  };
  const renderCommentInput = () => {
    return (
      <>
        <div className="row justify-content-center comment-input-div">
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Type Your Comment"
              value={commentBody}
              onChange={handleCommentBody}
            ></input>
          </div>
        </div>
      </>
    );
  };

 

  return (
    <>
      <div className="row justify-content-center upper-div">
        <div className="wrapping-div col-8 justify-content-center">
          {editFlag ? renderCommentText() : renderCommentInput()}

          <div className="row justify-content-center">
            <div className="col-2">
              <p className="post-id">Post ID : {props.dataForComment.postId}</p>
            </div>

            <div className="col-2">
              <p className="user-id">Comment ID : {props.dataForComment.id}</p>
            </div>

            <div className="col-4">
              <p className="user-id">email : {props.dataForComment.email}</p>
            </div>
          </div>

          <div className="row justify-content-center user-control">
            {editFlag ? (
              <div className="col-2">{editComment()}</div>
            ) : (
              <div className="col-2">{updateComment()}</div>
            )}
            <div className="col-2">{deleteComment()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
