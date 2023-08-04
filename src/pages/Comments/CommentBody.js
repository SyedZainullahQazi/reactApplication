import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/Auth/authContext.js";
import Comments from "../../components/comments/Comments.js";
import {CommentsAPI} from "../../api/CommentsAPI.js";
import { HandleCommentBtnClick } from "../../helper/comments/CommentHelper.js";
import NavbarApp from "../../components/navigationBar.js";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/comments-body.css";

export default function CommentBody(props) {
  //gets the userid and postid variable
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  let [comments, updateComments] = useState("");
  let [newCommentBody, updateNewCommentBody] = useState("");
  const { userCredentials, userData } = useContext(AuthContext);
  console.log(stateData);

  // Fetches the Comments Data Relevant to the Post and Renders it
  useEffect(() => {
    async function fetchAndSetComments() {
      const dataFetched = await CommentsAPI(stateData);
      if (dataFetched) {
        updateComments(dataFetched);
      }
    }
    fetchAndSetComments();
  }, [stateData.postid]); // Add stateData.postid as a dependency

  //Comments Render On the Comments Body
  const renderComments = () => {
    const components = [];
    for (let i = 0; i < comments.length; i++) {
      components.push(
        <Comments
          allComments={comments}
          upComments={updateComments}
          dataForComment={comments[i]}
          key={comments[i].id}
          userId={stateData.userid}
          users={userData}
        />
      );
    }
    return components;
  };

  const handleCommentBody = (e) => {
    updateNewCommentBody(e.target.value);
  };
 
  //Conditional Render of the Comment Section if User
  //Credentials are set
  if (userCredentials) {
    return (
      <>
        <ToastContainer />
       <NavbarApp/>
        <div className="row justify-content-center">
          <div className="write-comment col-8">
            <div className="row justify-content-center comment-input-div">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Your Comment "
                  value={newCommentBody}
                  onChange={handleCommentBody}
                ></input>
              </div>
            </div>

            <div className="row justify-content-center comment-btn-div">
              <div className="col-2">
                <Button
                  variant="outline-warning"
                  onClick={()=>{HandleCommentBtnClick(userData,stateData,userCredentials.id,comments,updateComments,newCommentBody)}}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {renderComments()}
      </>
    );
  } else {
    navigate("/");
  }
}

