//react components
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useContext,useEffect,useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../context/Auth/authContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styles/login.css";
import "../../styles/register.css"

export default function Auth(props)
{
    const [credWarning,setCredWarning]=useState();
    const {userCredentials,loginUser,userData,addUserData} = useContext(AuthContext);
    const navigate=useNavigate();
    const flag=props.flag;

    useEffect(() => {
        //if UserCredentials are already set
        if (userCredentials) {
        navigate("/posts");
        }        
    }, [userCredentials,navigate]);
    

    const formik=useFormik({

        initialValues:{
            emailVal:"",
            passwordVal:"",
            nameVal:"",
        },

        validationSchema:Yup.object({
            emailVal:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
            passwordVal:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
        }),

        onSubmit:(values)=>{
            if (flag)
            {
                const newId = userData.reduce((maxId, currentObj) => {
                    return currentObj.id > maxId ? currentObj.id : maxId;
                }, -Infinity)+1;

                const updatedData=[...(userData),{
                    name:values.nameVal,
                    email:values.emailVal,
                    password:values.passwordVal,
                    id:newId,
                }];
                loginUser(newId,values.passwordVal);
                addUserData(updatedData);
            }
            else
            {
                for(let i=0;i<userData.length;i++)
                { 
                    if(values.emailVal===userData[i].email &&
                     values.passwordVal===userData[i].password) 
                    {
                        loginUser(userData[i].id,values.passwordVal); 
                        navigate('/posts'); 
                        setCredWarning(""); 
                        return;
                    } 
                }
                setCredWarning("Mismatched Creds Or No Such User"); 
            }
        },
    });


    const nameField = (flag) => {
        if (flag) {
          return (
            <div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter Your Name"
                onChange={formik.handleChange}
                value={formik.values.nameVal}
                id="nameVal"
                name="nameVal"
                onBlur={formik.handleBlur}
                required
              />
    
              {formik.touched.nameVal && formik.errors.nameVal ? <p>{formik.errors.nameVal}</p> : <></>}
            </div>
          );
        }
        return <></>;
      };
    
//renders the component structure
if(!(userCredentials))
{

    return (
            <>
                <div className='row justify-content-center main-division'>
                    <div className="wrapper-div col-5">
                        <div className="row justify-content-center" >
                            <div className="col-10">
                                <p className='login-heading'>{flag?<>Register</>:<>LOGIN</>}</p>
                            </div>
                            <div className="col-7">
                            <p className="login-subtext">{flag?<>Please Register Yourself With Us</>:<>Please Enter Your Email And password</>}</p>
                            </div>
                        </div>
                        
                        <div className='row justify-content-center'> 
                            <div className="col-6">
                                <Form onSubmit={formik.handleSubmit}>

                                    {nameField(flag)}

                                    <input type="email" className="login-input" placeholder="Enter Your Email"
                                    onChange={formik.handleChange} value={formik.values.emailVal} id="emailVal" 
                                    name="emailVal" onBlur={formik.handleBlur} required/>
                                    
                                    {/*Email Validation Voilation Check */}
                                    {formik.touched.emailVal && formik.errors.emailVal?<p>{formik.errors.emailVal}</p>:null}


                                    <input type="password" className="login-input" placeholder="Enter Your Password" 
                                    onChange={formik.handleChange} value={formik.values.passwordVal} id="passwordVal"
                                    name="passwordVal" onBlur={formik.handleBlur} required/>

                                    {/*Password Validation Voilation Check */}
                                    {formik.touched.passwordVal && formik.errors.passwordVal?<p>{formik.errors.passwordVal}</p>:null}


                                    <div className="row justify-content-center div-wrapper">
                                        {flag ? (
                                            <Link to="/" className="signin">
                                                SignIn Instead
                                            </Link>
                                        ) : (
                                            <Link to="/register" className="signin">
                                                Register Yourself
                                            </Link>
                                        )}
                                    </div>

                                    <div className="row justify-content-center div-wrapper">
                                        <div className='col-6 register-button'>
                                        <Button variant="outline-info" type="submit">{flag ? <>REGISTER'</> : <>LOGIN</>}</Button>{' '}
                                        </div>
                            
                                    </div>

                                    <div>
                                        <p>{flag ? <></> : credWarning}</p>
                                    </div>
                                </Form>

                            </div>
                            
                        </div>
                    </div>
                </div>
                  
            </>
            );
    }
}