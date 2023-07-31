import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login";
import Register from "./components/register";
import PostBody from './components/postsBody';
import EditPost from './components/editPost';
import FourZeroFour from './components/fourZerofour';
import AuthProvider from './context/Comments/authContext';
import WritePost from './components/WritePost';
import {Route,Routes} from "react-router-dom";
import {useState} from "react";
import PostStateContext from './context/PostStateContext';
import CommentBody from "./components/comments/CommentBody"



export default function App() {
  
  //Using useState to intialize the usersData array of Objects
  //to store the users Data in Local Memory of the Program
  const [usersData,setUserData]=useState([{id:1,name:"Syed Zainullah Qazi",password:"pakistan12345",email:"syedzainullahqazi@gmail.com"}])

  // Function to update the usersData in Parent
  //in Order To register More Users at Runtime
  const addUserData=(updatedData)=>
  {
    setUserData(updatedData);
  }

  return (
  <PostStateContext>
    <AuthProvider>
          <Routes>
                <Route path="/" element={<Login users={usersData}/>}/>
                <Route path="/register" element={<Register users={usersData} updateUsers={addUserData} />}/>
                <Route path="/posts/:id" element={<PostBody/>}/>
                <Route path="/edit-post" element={<EditPost/>}/>
                <Route path="/writepost/:userid" element={<WritePost/>}/>
                <Route path="/comments" element={<CommentBody  users={usersData}/>}></Route>
                <Route path="*" element={<FourZeroFour/>} />
                <Route path="/404" element={<FourZeroFour/>}></Route>
          </Routes>
    </AuthProvider>
  </PostStateContext>
  
  );


}