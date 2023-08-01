import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/login";
import Register from "./pages/register";
import FourZeroFour from './pages/fourZerofour';
import AuthProvider from './context/Auth/authContext';
import {Route,Routes} from "react-router-dom";
import PostStateContext from './context/Posts/PostStateContext';
import CommentBody from "./components/comments/CommentBody"
import MyPosts from './components/posts/myPosts';
import EditBody from './pages/editBody';
import WriteBody from './pages/writeBody';
import PostBody from './pages/postsBody';

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
                <Route path="/edit-post" element={<EditBody/>}/>
                <Route path="/writepost" element={<WriteBody/>}/>
                <Route path="/comments" element={<CommentBody />}></Route>
                <Route path="/myposts" element={<MyPosts/>}></Route>
                <Route path="*" element={<FourZeroFour/>} />
                <Route path="/404" element={<FourZeroFour/>}></Route>
          </Routes>
    </AuthProvider>
  </PostStateContext>
  
  );


}