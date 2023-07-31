//React Components
import { useLocation,useNavigate } from 'react-router-dom';
import {useEffect,useState,useContext} from "react";

//COMPONENTS TO BE Ussed
import Comments from "./Comments.js";
import { AuthContext } from '../../context/Comments/authContext';
import CommentsAPI from '../../API/CommentsAPI';

//EXTERNAL AND INTERNAL UI DEPENDENCIES
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "../../styles/comments-body.css"



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
    const { userCredentials,userData} = useContext(AuthContext);

    //useNavigate to naviagte to homepage in case authentication fails
    const navigate=useNavigate();



    // Fetches the Comments Data Relevant to the Post and Renders it
  useEffect(() => {
    // Fetch the comments data from localStorage if available
    const storedComments = localStorage.getItem(`comments_${stateData.postid}`);
    if (storedComments) {
      updateComments(JSON.parse(storedComments));
    } else {
      // If not available, fetch the data from the API
      CommentsAPI(stateData)
        .then((response) => response.json())
        .then((dataFetched) => {
          updateComments(dataFetched);
          // Store the fetched data in localStorage
          localStorage.setItem(`comments_${stateData.postid}`, JSON.stringify(dataFetched));
        });
    }
  }, [stateData.postid]);




    // //Fetches the Comments Data Relevent to the Post and Renders it
    // useEffect(()=>{
    //     CommentsAPI(stateData).
    //     then((response)=>response.json()).
    //     then((dataFetched)=>updateComments(dataFetched));},[(stateData?stateData.postid:"")]);

    //Comments Render On the Comments Body
    const renderComments=()=>
    {
        const components=[];
        for(let i=0;i<comments.length;i++)
        {
            components.push(<Comments allComments={comments} upComments={updateComments} dataForComment={comments[i]} key={comments[i].id} userId={stateData.userid} users={userData} /> );
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
        let anEmail="";
        for(let element of userData)
        {
            if(element.id===userCredentials.id)
            {
                anEmail=element.email;
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
            email:anEmail,
        }
        let addedCommentArr = [...comments];
        addedCommentArr.unshift(aNewComment);
        updateComments(addedCommentArr);

        // Update localStorage with the updated comments array
        localStorage.setItem(`comments_${stateData.postid}`, JSON.stringify(addedCommentArr));

        alert('Commented Successfully');
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