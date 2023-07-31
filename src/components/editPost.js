//Imports Components from React
import {useFormik} from 'formik';
import {useContext} from "react";
import * as Yup from 'yup';
import { useLocation,useNavigate } from 'react-router-dom';

//Imports UI Dependencies
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/editPost.css"

//Imports Components
import PostContext from "../context/PostContext.js";
import { AuthContext } from '../context/Comments/authContext';


export default function EditPost(props)
{   

    //Fetches Post Data From The PostContext
    //Where Post Data is Fetched 
    const ContextFetchedPostData=useContext(PostContext);
    const postData=ContextFetchedPostData.postData;
    // const updatePostData=ContextFetchedPostData.updatePost;


    //A useNavigate Hook is called to provide navigation
    //Between Pages
    const navigate=useNavigate();

    //Login Credentials Redemption from AuthContext
    //Using context api to share auth state between 
    //Components
    const {userCredentials} = useContext(AuthContext);

    //Use Location to Get the State Object from the 
    //Posts page where state object was sent through to={state:{}};
    //stateData holds posts attributes, id,title,body,userid etc
    const location = useLocation();
    const stateData = location.state;



    //Using Formik Instead of useState
    const formik=useFormik({

        initialValues:{
            title:stateData?stateData.title:"",
            article:stateData?stateData.body:"",
        },

        //Validation On Title and Post Content 
        validationSchema:Yup.object({
            title:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
            article:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
        }),

        //Update the Values on Submit
        onSubmit:(values)=>{
            for (const element of postData) {
                if(element.id===stateData.id)
                {
                    element.body=values.article;
                    element.title=values.title;
                }   
            }
        },
    });

    //Conditionally Renders the UI
    if(userCredentials)
    {
      return (
    <>
        <div className="row justify-content-center upper-div">
            
            
            <div className="wrapping-div col-8 justify-content-center">
                

                    <div className="row justify-content-center">
                        <div className="col-6">
                            <h1 className="edit-post-heading">EDIT POST </h1>
                        </div>
                    </div>

                    
                    <div className="row justify-content-center">
                        <div className='col-8'>
                                <form onSubmit={formik.handleSubmit} >
                                    
                                    <input type="text"  className="edit-title" placeholder=""
                                    onChange={formik.handleChange} value={formik.values.title} id="title"
                                    onBlur={formik.handleBlur} />
                                    {formik.touched.title && formik.errors.title?<p>{formik.errors.title}</p>:null}
                                    
                                    <input type="textarea" rows="10" cols="20" className="edit-body" placeholder="" 
                                    onChange={formik.handleChange} value={formik.values.article} id="article"
                                    onBlur={formik.handleBlur} />
                                    {formik.touched.article && formik.errors.article?<p>{formik.errors.article}</p>:null}

                                    <div className="row justify-content-center">
                                        <div className='col-4 edit-button'>
                                            <Button variant="outline-info" type="submit">EDIT</Button>
                                        </div>
                                    </div>
                                </form>
                        </div>

                    </div>

            </div>

        </div>
    </>
    )
    }
    else
    {
        navigate("/")
    }

}