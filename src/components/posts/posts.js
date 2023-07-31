//Imports react Dependencies
import {Link} from 'react-router-dom';
import {useContext} from 'react';

//Imports PostContext Module to use post data here
import PostContext from '../../context/Posts/PostContext';
import { AuthContext } from '../../context/Comments/authContext';


//Imports External and Internal UI Dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/posts.css"
import Button from 'react-bootstrap/Button';





export default function Posts(props){

    //Fetches Post Data From Post Context
    //Assigns the postData the pots object of array
    //and assigns updatePostData function to update that arry object
    //which is actually a state variable in context
    const FetchedDataFromPostContext=useContext(PostContext);
    const postData=FetchedDataFromPostContext.postData;
    const updatePostData=FetchedDataFromPostContext.updatePost;

    //Login Credentials Redemption from context
    const {userCredentials} = useContext(AuthContext);

    //Gets current ID of the user 
    const id=userCredentials.id;

    //function to conditionally render editPost Button
    const editPost=()=>
    {
        if(props.dataForPost.userId===id)
        {
            return (
                    <Link to='/edit-post' state={props.dataForPost}>
                    <Button variant="outline-info">EDIT</Button>
                    </Link>);
        }
        return (<></>);
    }
    //When Delete Button is pressend The post is deleted 
    function onClickDeletePost()
    {   
        const index=postData.findIndex((element)=>element.id===props.dataForPost.id);
        alert("Index "+index);
        const updatedArray=[...(postData)];
        updatedArray.splice(index,1);
        updatePostData(updatedArray);
    }

    //function to conditionally render deletePost Button
    const deletePostButton=()=>
    {
        if(props.dataForPost.userId===id)
        {
            return (
                    <Button onClick={onClickDeletePost} variant="outline-danger">Delete</Button>
                    );
        }
        return (<></>);
    }

    //Handler Function For Comment Button
    //Moves To Comments Page and Sends
    //UserID and PostID as State Variables
    const commentPostButton=()=>
    {
        return (
            <Link to='/comments' state={{postid:props.dataForPost.id,userid:id}}>
            <Button variant="outline-info">Comments</Button>
            </Link>);
    }


    return (
    <>
        <div className="row justify-content-center upper-div">
            
            
            <div className="wrapping-div col-8 justify-content-center">
                
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <h3 className='title'>Title : {props.dataForPost.title}</h3>
                        </div>
                    </div>

                    
                    <div className="row justify-content-center">
                        <div className='col-8'>
                            <p className="article">Article : {props.dataForPost.body}</p>
                        </div>
                    </div>


                    <div className="row justify-content-center">
                        <div className="col-4">
                            <p className="post-id">Post ID : {props.dataForPost.id}</p>
                        </div>


                        <div className="col-4">
                            <p className="user-id">User ID : {props.dataForPost.userId}</p>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center user-control">
                        <div className="col-3">
                            {commentPostButton()}
                        </div>

                        <div className="col-2">
                            {editPost()}
                        </div>

                        <div className="col-3">
                            {deletePostButton()}
                        </div>
                    </div>

            </div>

        </div>
    </>);

   
}