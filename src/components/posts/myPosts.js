import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/Auth/authContext";
import NavbarApp from "../navigationBar";
import Posts from "./posts.js";
import PostContext from "../../context/Posts/PostContext.js";

import "bootstrap/dist/css/bootstrap.min.css";

export default function MyPosts(props) {
  const navigate = useNavigate();
  const ContextFetchedPostData = useContext(PostContext);
  const postData = ContextFetchedPostData.postData;
  const { userCredentials } = useContext(AuthContext);
  const id = userCredentials ? userCredentials.id : NaN;
  
  const onClickWritePost=()=> {
    navigate("/writepost");
  }
 
  const renderPosts = () => {
    const components = [];
    for (let i = 0; i < postData.length; i++) {
      if (postData[i].userId === id) {
        components.push(
          <Posts dataForPost={postData[i]} key={postData[i].id} userId={id} />
        );
      }
    }
    return components;
  };

    return (
      <>
        {<NavbarApp/>}
        {renderPosts()}
      </>
    );
}
