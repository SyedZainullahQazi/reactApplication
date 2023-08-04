import {Route,Routes} from "react-router-dom";

import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import FourZeroFour from './pages/Errors/fourZerofour';
import AuthProvider from './context/Auth/authContext';
import PostStateContext from './context/Posts/PostStateContext';
import CommentBody from "./pages/Comments/CommentBody"
import MyPosts from './components/posts/myPosts';
import EditBody from './pages/Posts/editBody';
import WriteBody from './pages/Posts/writeBody';
import PostBody from './pages/Posts/postsBody';
import { ProtectedRoute } from './context/Auth/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
  <PostStateContext>
    <AuthProvider>
          <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/404" element={<FourZeroFour/>}></Route>
                <Route path="/posts" element={ <ProtectedRoute elementBody={<PostBody/>}/>} />
                <Route path="/edit-post" element={ <ProtectedRoute elementBody={<EditBody/>}/>}/>
                <Route path="/writepost" element={ <ProtectedRoute elementBody={<WriteBody/>} />}/>
                <Route path="/myposts" element={ <ProtectedRoute elementBody={<MyPosts/>}/>} />
                <Route path="/comments" element={ <ProtectedRoute elementBody={<CommentBody/>}/>} />
                <Route path="*" element={<FourZeroFour/>} />
                
          </Routes>
    </AuthProvider>
  </PostStateContext>
  );
}