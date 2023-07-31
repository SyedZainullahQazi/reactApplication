//React Modules Imports
import {useState,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup'

//External UI Modules 
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

//Internal Stylesheet
import "../styles/login.css"

//Modules Import
import { AuthContext } from '../context/Comments/authContext';


export default function Login(props)
{
    //CredWarning StateVariable to Show Error
    //Message If Credentials Doesn't Matches 
    const [credWarning,setCredWarning]=useState();

    //Use Navigate to Navigate to Posts
    //If the Login credentials Matches
    const navigate = useNavigate();

    //Login Credentials Redemption from context
    const { loginUser,userCredentials} = useContext(AuthContext);
    

    //Formik To Validate and handle On Submit
    //EmailValue and Password Value
    const formik=useFormik({
        initialValues:{
            emailVal:"",
            passwordVal:"",
        },
        //Email Must Be 5 Chars Long
        //Password Must Be 10 Chars Long
        validationSchema:Yup.object({
            emailVal:Yup.string().min(5,"Must be 5 Chars").required("Tis Required"),
            passwordVal:Yup.string().min(10,"Must be 1- Chars").required("Tis Required"),
        }),
        //checks if the Values of email and passwords
        //Matches Any usersList Passed in Props from App.
        onSubmit:(values)=>{
            for(let i=0;i<props.users.length;i++)
            {
                if(values.emailVal===props.users[i].email && 
                values.passwordVal===props.users[i].password)
                {
                    loginUser(props.users[i].id,values.passwordVal);
                    navigate('/posts/'+ props.users[i].id);
                    setCredWarning("");
                }
            }
            //If There Is no Such Matching Email and Password 
            //Shows this Error on the Screen 
            setCredWarning("Mismatched Creds Or No Such User");
            
        },
    });

    //Conditional Rendering  -  If Credentials Of users are not already set shows
    //Login Page for user to Register Otherwise ,redirects him to posts.
    if(!(userCredentials))
    {
            return (
                    <>
                        <div className='row justify-content-center main-division'>
                            <div className="wrapper-div col-5">
                                
                                <div className="row justify-content-center" >
                                    <div className="col-10">
                                        <p className='login-heading'>LOGIN</p>
                                    </div>
                                    <div className="col-7">
                                    <p className="login-subtext">Please Enter Email And Password</p>
                                    </div>
                                </div>
                                
                                <div className='row justify-content-center'> 
                                    <div className="col-6">

                                        <form onSubmit={formik.handleSubmit} >
                                            <input type="email"  className="login-input" placeholder="Enter Your Email"
                                            onChange={formik.handleChange} value={formik.values.emailVal} id="emailVal"
                                            onBlur={formik.handleBlur} />
                                            {formik.touched.emailVal && formik.errors.emailVal?<p>{formik.errors.emailVal}</p>:null}
                                            
                                            <input type="password" className="login-input" placeholder="Enter Your Password" 
                                            onChange={formik.handleChange} value={formik.values.passwordVal} id="passwordVal"
                                            onBlur={formik.handleBlur} />
                                            {formik.touched.passwordVal && formik.errors.passwordVal?<p>{formik.errors.passwordVal}</p>:null}

                                            <div className="row justify-content-center div-wrapper">
                                                <div className='col-8'>
                                                    <Link to="/register" className="register">Register Yourself</Link>
                                                </div>
                                            </div>

                                            <div className="row justify-content-center div-wrapper">
                                                <div className='col-6 button-div'>
                                                    <Button variant="outline-info" type="submit">LOGIN</Button>    
                                                </div>

                                                <p>{credWarning}</p>

                                                </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
    }
    //Navigated To posts if credientials are already Set.
    else 
    {
        navigate('/posts/'+userCredentials.id);
    }
}
