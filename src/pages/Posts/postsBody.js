import { AuthContext } from "../../context/Auth/authContext";
import { useContext } from "react";

import NavbarApp from "../../components/navigationBar";
import Posts from "../../components/posts/posts.js";
import PostContext from "../../context/Posts/PostContext.js";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PostBody(props) {
  const ContextFetchedPostData = useContext(PostContext);
  const postData = ContextFetchedPostData.postData;
  const {userCredentials} = useContext(AuthContext);
  const id = userCredentials ? userCredentials.id : NaN;

  const renderPosts = () => {
    const components = [];
    for (let i = 0; i < postData.length; i++) {
      components.push(
        <Posts dataForPost={postData[i]} key={postData[i].id} userId={id} />
      );
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
