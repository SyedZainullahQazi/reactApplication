//React Components
import { useState } from "react";

//UI External and Internal Dependencies
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/posts.css";
import Button from "react-bootstrap/Button";

export default function Comments(props) {
  //Takes the userId from CommentBody
  const userid = parseInt(props.userId);
  //State Variable To Edit Comments
  const [editFlag, updateEditFlag] = useState(true);
  //State Variable For Input
  const [commentBody, setCommentBody] = useState(props.dataForComment.body);
  //Handler Function for Comment Body Input
  const handleCommentBody = (e) => {
    setCommentBody(e.target.value);
  };
  //Delete Comment 
  const deleteComment = () => {
    let userEmail = findEmail(userid);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-danger" onClick={handleDeleteBtn}>
          Delete
        </Button>
      );
    }
    return <></>;
  };
  const handleDeleteBtn = () => {
    // let userEmail=props.dataForComment.email;
    const index = props.allComments.findIndex(
      (element) => element.email === props.dataForComment.email
    );
    const updatedArray = [...props.allComments];
    updatedArray.splice(index, 1);
    props.upComments(updatedArray);
  };

  //function to conditionally render editPost Comment
  //Only if our user Email matches with the comment email
  const editComment = () => {
    let userEmail = findEmail(userid);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-info" onClick={handleEditBtn}>
          EDIT
        </Button>
      );
    }
    return <></>;
  };
  //After Pressing Edit Comment, update Comment Button Appears
  //When UpdateButton is Pressed this function is called
  const updateComment = () => {
    let userEmail = findEmail(userid);

    if (props.dataForComment.email === userEmail) {
      return (
        <Button variant="outline-warning" onClick={handleUpdateBtn}>
          UPDATE
        </Button>
      );
    }
  };
  //Based on This state Flag we conditionally Render Buttons
  const handleEditBtn = () => {
    updateEditFlag(false);
  };
  const handleUpdateBtn = () => {
    updateEditFlag(true);
    props.dataForComment.body = commentBody;
  };

  //Render Comment Text
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
              placeholder="Type Your Comment Name"
              value={commentBody}
              onChange={handleCommentBody}
            ></input>
          </div>
        </div>
      </>
    );
  };

  const findEmail = (idofUser) => {
    for (let element of props.users) {
      if (idofUser === element.id) {
        return element.email;
      }
    }
    return "";
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
