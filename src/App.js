import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Pages/login";
import Register from "./Pages/register";
import PostBody from './components/posts/postsBody';
import EditPost from './components/posts/editPost';
import FourZeroFour from './Pages/fourZerofour';
import AuthProvider from './context/Comments/authContext';
import WritePost from './components/posts/WritePost';
import {Route,Routes} from "react-router-dom";
import PostStateContext from './context/Posts/PostStateContext';
import CommentBody from "./components/comments/CommentBody"
import MyPosts from './components/posts/myPosts';


export default function App() {
  
  //Using useState to intialize the usersData array of Objects
  //to store the users Data in Local Memory of the Program
  // const [usersData,setUserData]=useState([{id:10,name:"Syed Zainullah Qazi",password:"pakistan12345",email:"syedzainullahqazi@gmail.com"}])

  return (
  <PostStateContext>
    <AuthProvider>
          <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/posts" element={<PostBody/>}/>
                <Route path="/edit-post" element={<EditPost/>}/>
                <Route path="/writepost" element={<WritePost/>}/>
                <Route path="/comments" element={<CommentBody/>}></Route>
                <Route path="/myposts" element={<MyPosts/>}></Route>
                <Route path="*" element={<FourZeroFour/>} />
                <Route path="/404" element={<FourZeroFour/>}></Route>
          </Routes>
    </AuthProvider>
  </PostStateContext>
  
  );


}