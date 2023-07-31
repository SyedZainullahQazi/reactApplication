//Imports the Hooks from React Core
import {useContext} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';

//Imports The internal and external Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/editPost.css"
import Button from 'react-bootstrap/Button';

//Imports components
import PostContext from "../context/PostContext.js";
import { AuthContext  } from '../context/Comments/authContext';


export default function WritePost(props)
{   
    //gets the userId from params
    let { userid } = useParams();
    
    //tries UserId if value is avaliable
    //converts it to integer type
    try
    {
    userid=parseInt(userid);
    }
    catch(e)
    {
        console.log(e);
    }

    //uses navigate to navigate to another page
    const navigate=useNavigate();

    //Fetches Post data from Context API
    //and assigns variable the value assets of PostContext
    const ContextFetchedPostData=useContext(PostContext);
    const postData=ContextFetchedPostData.postData;
    const updatePostData=ContextFetchedPostData.updatePost;

    //Login Credentials Redemption from context
    const {userCredentials} = useContext(AuthContext);

    console.log("hi");

    //Using Formik Instead of useState
    const formik=useFormik({

        initialValues:{
            title:"",
            article:""
        },

        //Validation On Title and Post Content 
        validationSchema:Yup.object({
            title:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
            article:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
        }),

        //Update the Values on Submit
        onSubmit:(values)=>{
            const updatedArr= [...(postData)];
            const newId = postData.reduce((maxId, currentObj) => {
                return currentObj.id > maxId ? currentObj.id : maxId;
              }, -Infinity)+1;
            
            updatedArr.unshift({userId:userid,id:newId,title:values.title,body:values.article});
            updatePostData(updatedArr);
        },
    });

    
    //Conditonal rendering of the Html/JSX on page
        if(userCredentials)
        {
    return (
    <>
        <div className="row justify-content-center upper-div">
            
            
            <div className="wrapping-div col-8 justify-content-center">
                

                    <div className="row justify-content-center">
                        <div className="col-6">
                            <h1 className="edit-post-heading">NEW POST </h1>
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
                                            <Button variant="outline-info" type="submit">Publish</Button>
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
        navigate("/");
    }

}