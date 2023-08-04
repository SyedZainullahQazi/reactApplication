import {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../context/Auth/authContext';
import Button from 'react-bootstrap/Button';


 
 export default function NavbarApp()
{
    const navigate=useNavigate();
    const {logoutUser } = useContext(AuthContext);
    //Handle Click for My Posts button
    const onClickMyPosts = () => {
    navigate("/myposts");
     };
    const onClickWritePost=()=> {
    navigate("/writepost");
    }
    const onClickAllPosts=()=>
    {
        navigate("/posts");
    }


    return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div>
          <Button variant="outline-warning" onClick={onClickWritePost}>
            WRITE POST
          </Button>
        </div>
        <div>
          <Button variant="outline-primary" onClick={onClickAllPosts}>
            ALL POSTS
          </Button>
        </div>

        <div>
          <Button variant="outline-success" onClick={onClickMyPosts}>
            MY POSTS
          </Button>
        </div>

        <div>
          <Button variant="outline-danger" onClick={logoutUser}>
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  </nav>)
}