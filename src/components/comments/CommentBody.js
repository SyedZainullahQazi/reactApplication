//React Components
import { useLocation,useNavigate } from 'react-router-dom';
import {useEffect,useState,useContext} from "react";

//EXTERNAL AND INTERNAL UI DEPENDENCIES
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "../../styles/comments-body.css"

//COMPONENTS TO BE Ussed
import Comments from "./Comments.js";
import { AuthContext } from '../../context/Comments/authContext';


export default function CommentBody(props){


    //gets the userid and postid variable
    //sent from the posts Module.
    const location = useLocation();
    const stateData = location.state;

    //USESTATE For Commments Inputs
    let [comments,updateComments]=useState("");
    let [newCommentBody,updateNewCommentBody]=useState("");
    let [newCommentTitle,updateNewCommentTitle]=useState("");

    //Calling Authentication Context
    const { userCredentials} = useContext(AuthContext);

    //useNavigate to naviagte to homepage in case authentication fails
    const navigate=useNavigate();



    //Fetches the Comments Data Relevent to the Post and Renders it
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts/"+(stateData?stateData.postid:"")+"/comments").
        then((response)=>response.json()).
        then((dataFetched)=>updateComments(dataFetched));},[(stateData?stateData.postid:"")]);

    //Comments Render On the Comments Body
    const renderComments=()=>
    {
        const components=[];
        for(let i=0;i<comments.length;i++)
        {
            components.push(<Comments allComments={comments} upComments={updateComments} dataForComment={comments[i]} key={comments[i].id} userId={stateData.userid} users={props.users} /> );
        }
        return components;
    }

    //handleInput For Comments Title
    const handleCommentBody=(e)=>
    {
        updateNewCommentBody(e.target.value);
    }

    //handleInput For Comments Title
    const handleCommentTitle=(e)=>
    {
        updateNewCommentTitle(e.target.value);
    }

    //commentOnClick
    const handleCommentBtnClick=()=>
    {
        let email="";
        for(let element of props.users)
        {
            if(element.id===stateData.userid)
            {
                email=element.email;
                break;
            }
        }
        const newId = comments.reduce((maxId, currentObj) => {
            return currentObj.id > maxId ? currentObj.id : maxId;
          }, -Infinity)+1;


        let aNewComment=
        {
            postId:stateData.postid,
            id:newId,
            name:newCommentTitle,
            body:newCommentBody,
            email:email,
        }
        let addedCommentArr=[...(comments)];
        addedCommentArr.unshift(aNewComment);
        updateComments(addedCommentArr);
    }

    //Conditional Render of the Comment Section if User
    //Credentials are set
    if(userCredentials)
    {
    return (
        <>
            <div className="row justify-content-center">
                
                <div className="write-comment col-8">
                    
                    <div className="row justify-content-center comment-input-div">
                        <div className="col-10">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type Your Comment Title" 
                            value={newCommentTitle}
                            onChange={handleCommentTitle}></input>
                        </div>
                    </div>

                    <div className="row justify-content-center comment-input-div">
                        <div className="col-10">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type Your Comment Body" 
                            value={newCommentBody}
                            onChange={handleCommentBody}></input>
                        </div>
                    </div>

                    <div className="row justify-content-center comment-btn-div">
                        <div className="col-2">
                            <Button variant="outline-warning"  onClick={handleCommentBtnClick}>Comment</Button>
                        </div>
                    </div>
                
                </div>

            </div>

            {renderComments()} 
        </>);
    }
    else
    {
        navigate("/");
    }
   
}