//React Components
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

//COMPONENTS TO BE Used
import Comments from "./Comments.js";
import { AuthContext } from "../../context/Auth/authContext.js";
import CommentsAPI from "../../api/CommentsAPI.js";
import {
  CommentGetItemsLocalStorage,
  CommentSetItemsLocalStorage,
} from "../../utils/Comments/commentLocalStorage.js";

//EXTERNAL AND INTERNAL UI DEPENDENCIES
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../../styles/comments-body.css";

export default function CommentBody(props) {
  //gets the userid and postid variable
  //sent from the posts Module.
  const location = useLocation();
  const stateData = location.state;

  //USESTATE For Commments Inputs
  let [comments, updateComments] = useState("");
  let [newCommentBody, updateNewCommentBody] = useState("");

  //Calling Authentication Context
  const { userCredentials, userData } = useContext(AuthContext);

  const findName = () => {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === userCredentials.id) {
        return userData[i].name;
      }
    }
    return null;
  };

  //useNavigate to naviagte to homepage in case authentication fails
  const navigate = useNavigate();

  // Fetches the Comments Data Relevant to the Post and Renders it
  useEffect(() => {
    async function fetchAndSetComments() {
      const dataFetched = await fetchComments(stateData);
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
  //handleInput For Comments Title
  const handleCommentBody = (e) => {
    updateNewCommentBody(e.target.value);
  };
  //commentOnClick
  const handleCommentBtnClick = () => {
    let anEmail = "";
    for (let element of userData) {
      if (element.id === userCredentials.id) {
        anEmail = element.email;
        break;
      }
    }
    const newId =
      comments.reduce((maxId, currentObj) => {
        return currentObj.id > maxId ? currentObj.id : maxId;
      }, -Infinity) + 1;

    let aNewComment = {
      postId: stateData.postid,
      id: newId,
      name: findName(), // Added .name after the find method
      body: newCommentBody,
      email: anEmail,
    };
    let addedCommentArr = [...comments];
    addedCommentArr.unshift(aNewComment);
    updateComments(addedCommentArr);

    // Update localStorage with the updated comments array
    CommentSetItemsLocalStorage(stateData.postid, addedCommentArr);

    alert("Commented Successfully");
  };
  //Conditional Render of the Comment Section if User
  //Credentials are set
  if (userCredentials) {
    return (
      <>
        <div className="row justify-content-center">
          <div className="write-comment col-8">
            <div className="row justify-content-center comment-input-div">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Your Comment Body"
                  value={newCommentBody}
                  onChange={handleCommentBody}
                ></input>
              </div>
            </div>

            <div className="row justify-content-center comment-btn-div">
              <div className="col-2">
                <Button
                  variant="outline-warning"
                  onClick={handleCommentBtnClick}
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

async function fetchComments(stateData) {
  try {
    const storedComments = CommentGetItemsLocalStorage(stateData.postid);

    if (storedComments) {
      return JSON.parse(storedComments);
    } else {
      const response = await CommentsAPI(stateData);
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
