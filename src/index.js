import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"

//Importing Browser Router From React Router Dom Library
import {BrowserRouter} from 'react-router-dom';

const root=ReactDOM.createRoot(document.getElementById("root"));


//Wrapping the Application in BrowserRouter 
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)