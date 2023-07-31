//react components
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//external and Internal UI dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/login.css";
import "../styles/register.css"


export default function Register(props)
{
    //Use navigate hook to navigate between pages
    const navigate=useNavigate();

    //formik instead of state to handle inputs State
    //to Handle onSubmit of register button 
    //to Valudate the Written text
    const formik=useFormik({

        initialValues:{
            emailVal:"",
            passwordVal:"",
            nameVal:"",
        },

        validationSchema:Yup.object({
            emailVal:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
            passwordVal:Yup.string().min(10,"Must be 10 Chars").required("Tis Required"),
            nameVal:Yup.string().min(3,"Must Be 3 Chars").required("Tis Requried"),
        }),

        onSubmit:(values)=>{
            const updatedData=[...(props.users),{
                name:values.nameVal,
                email:values.emailVal,
                password:values.passwordVal,
                id:props.users.length,
            }];
            props.updateUsers(updatedData);
            console.log(updatedData);
            alert("Successfully Registerd");
            navigate("/");
        },
    });

    

//renders the component structure
    return (
            <>
                <div className='row justify-content-center main-division'>
                    <div className="wrapper-div col-5">
                        <div className="row justify-content-center" >
                            <div className="col-10">
                                <p className='login-heading'>Register</p>
                            </div>
                            <div className="col-7">
                            <p className="login-subtext">Please Register Yourself With Us</p>
                            </div>
                        </div>
                        
                        <div className='row justify-content-center'> 
                            <div className="col-6">
                                <Form onSubmit={formik.handleSubmit}>

                                    <input type="text" className="login-input" placeholder="Enter Your Name"
                                    onChange={formik.handleChange} value={formik.values.nameVal} id="nameVal"
                                    name="nameVal" onBlur={formik.handleBlur} required/>

                                    {/* Name Validation Voilation Check */}
                                    {formik.touched.nameVal && formik.errors.nameVal?<p>{formik.errors.nameVal}</p>:null}

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
                                        <div className='col-8'>
                                            <Link to="/" className="signin">SignIn Instead</Link>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center div-wrapper">
                                        <div className='col-6 register-button'>
                                        <Button variant="outline-info" type="submit">REGISTER</Button>{' '}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </>
            );
}