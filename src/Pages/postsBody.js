//imports from react
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/authContext";
import NavbarApp from "../components/navigationBar";

//Components Imports
import Posts from "../components/posts/posts.js";
import PostContext from "../context/Posts/PostContext.js";

//UI dependencies
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostBody(props) {
  const navigate = useNavigate();

  //Fetches All Posts Data from Context API
  const ContextFetchedPostData = useContext(PostContext);
  const postData = ContextFetchedPostData.postData;

  //UserCredentials Fetch from Authentication Context
  const {userCredentials} = useContext(AuthContext);

  //getting User ID from Login
  const id = userCredentials ? userCredentials.id : NaN;

  
  //Compresses Post into an array and return it
  // on the posts body each post is a post component
  const renderPosts = () => {
    const components = [];
    for (let i = 0; i < postData.length; i++) {
      components.push(
        <Posts dataForPost={postData[i]} key={postData[i].id} userId={id} />
      );
    }
    return components;
  };

  

  //conditionally renders the posts body
  //based on the user credentials
  if (userCredentials) {
    return (
      <>
        {<NavbarApp/>}
        {renderPosts()}
      </>
    );
  } else {
    alert("Moving Back to Signin Page");
    navigate("/");
  }
}
