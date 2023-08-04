import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/Auth/authContext.js";
import NavbarApp from "../navigationBar.js";
import PostContext from "../../context/Posts/PostContext.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/editPost.css";
import Button from "react-bootstrap/Button";
import 'react-toastify/dist/ReactToastify.css';
 
export default function ComposePost(props) {
  const ContextFetchedPostData = useContext(PostContext);
  const postData = ContextFetchedPostData.postData;
  const updatePost = ContextFetchedPostData.updatePost;
  const { userCredentials } = useContext(AuthContext);
  const userid = userCredentials.id;
  const location = useLocation();
  //stateData holds post structure
  const stateData = location.state;
  let flag = props.flag;

  //Using Formik Instead of useState
  const formik = useFormik({
    initialValues: {
      title: flag ? "" : stateData ? stateData.title : "",
      article: flag ? "" : stateData ? stateData.body : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(10, "Must be 10 Chars").required("Tis Required"),
      article: Yup.string()
        .min(10, "Must be 10 Chars")
        .required("Tis Required"),
    }),
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
        updatePost(updatedArr);
        toast.success("Successfully Posted!!");
      } else {
        for (const element of postData) {
          if (element.id === stateData.id) {
            element.body = values.article;
            element.title = values.title;
          }
        }
        toast.success("Post Updated!!");
      }
      values.title="";
      values.article="";
    },
  });

  const postText = () => {
    if (flag) {
      return "NEW POST";
    }
    return "EDIT POST";
  };

  //Conditonal rendering of the Html/JSX on page
    return (
      <>
      <ToastContainer />
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
}
