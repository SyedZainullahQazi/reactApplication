//imports from react
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/Comments/authContext';

//Components Imports
import Posts from './posts.js'
import PostContext from '../../context/Posts/PostContext.js';

//UI dependencies
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';




export default function MyPosts(props){

    //Using Navigate Hook 
    const navigate=useNavigate();

    //Fetches All Posts Data from Context API
    const ContextFetchedPostData=useContext(PostContext);
    const postData=ContextFetchedPostData.postData;

    //Login Credentials Redemption from context
    const {userCredentials} = useContext(AuthContext);

    //getting User ID from Login
    const  id =(userCredentials?userCredentials.id:NaN);
    
    
    //When Write Post Button is Clicked 
    //We navigate to writepost Page
    function onClickWritePost()
    {
        navigate("/writepost");
    }


    //Compresses Post into an array and return it on the posts body
    //each post is a post component
    const renderPosts=()=>
    {
        const components=[];
        for(let i=0;i<postData.length;i++)
        {
            if(postData[i].userId===id)
            {
                components.push(<Posts dataForPost={postData[i]} key={postData[i].id} userId={id}/> );
            }
        }
        return components;
    }

    //conditionally renders the posts body
    //based on the user credentials
        if(userCredentials)
        {
            return (
            <>
                <div className="row justify-content-center user-control">
                    <div className="col-3 offset-1">
                        <Button variant="outline-warning" onClick={onClickWritePost} >WRITE POST</Button>
                    </div>
                </div>
            {renderPosts()} 
            </>);
        }
        else
        {
            alert("Moving Back to Signin Page");
            navigate("/");
        }
}