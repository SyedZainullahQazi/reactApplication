//Imports the Hooks from React Core
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

//Imports components
import PostContext from "../../context/Posts/PostContext.js";
import { AuthContext } from "../../context/Auth/authContext.js";
import NavbarApp from "../navigationBar.js";

//Imports The internal and external Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/editPost.css";
import Button from "react-bootstrap/Button";

export default function ComposePost(props) {
  const navigate = useNavigate();

  //Fetches Post data from Context API
  //and assigns variable the value assets of PostContext
  const ContextFetchedPostData = useContext(PostContext);
  const postData = ContextFetchedPostData.postData;
  const updatePostData = ContextFetchedPostData.updatePost;

  //Login Credentials Redemption from context
  const { userCredentials } = useContext(AuthContext);
  const userid = userCredentials.id;

  //Posts page sents state object was sent through to={state:{}};
  //stateData holds posts attributes, id,title,body,userid etc
  const location = useLocation();
  const stateData = location.state;

  //Flag Truth Value Represents : Write Post
  //Flag Flase Value Represents : Edit Post
  let flag = props.flag;

  //Using Formik Instead of useState
  const formik = useFormik({
    initialValues: {
      title: flag ? "" : stateData ? stateData.title : "",
      article: flag ? "" : stateData ? stateData.body : "",
    },

    //Validation On Title and Post Content
    validationSchema: Yup.object({
      title: Yup.string().min(10, "Must be 10 Chars").required("Tis Required"),
      article: Yup.string()
        .min(10, "Must be 10 Chars")
        .required("Tis Required"),
    }),

    //Update the Values on Submit
    onSubmit: (values) => {
      if (flag) {
        const updatedArr = [...postData];
        const newId =
          postData.reduce((maxId, currentObj) => {
            return currentObj.id > maxId ? currentObj.id : maxId;
          }, -Infinity) + 1;

        updatedArr.unshift({
          userId: userid,
          id: newId,
          title: values.title,
          body: values.article,
        });
        updatePostData(updatedArr);

        alert("Successfully Posted!!");
      } else {
        for (const element of postData) {
          if (element.id === stateData.id) {
            element.body = values.article;
            element.title = values.title;
          }
        }
        alert("Comment Updated Successfully");
      }
      navigate("/posts");
    },
  });

  const postText = () => {
    if (flag) {
      return "NEW POST";
    }
    return "EDIT POST";
  };

  //Conditonal rendering of the Html/JSX on page
  if (userCredentials) {
    return (
      <>
      {<NavbarApp/>}
        <div className="row justify-content-center upper-div">
          <div className="wrapping-div col-8 justify-content-center">
            <div className="row justify-content-center">
              <div className="col-6">
                <h1 className="edit-post-heading">{postText()} </h1>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-8">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    className="edit-title"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    id="title"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p>{formik.errors.title}</p>
                  ) : null}

                  <input
                    type="textarea"
                    rows="10"
                    cols="20"
                    className="edit-body"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={formik.values.article}
                    id="article"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.article && formik.errors.article ? (
                    <p>{formik.errors.article}</p>
                  ) : null}

                  <div className="row justify-content-center">
                    <div className="col-4 edit-button">
                      <Button variant="outline-info" type="submit">
                        Publish
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
}
