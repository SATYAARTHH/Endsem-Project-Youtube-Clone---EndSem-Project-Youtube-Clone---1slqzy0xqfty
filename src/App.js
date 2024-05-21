import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Details from "./Pages/Details";

function App() {
  const [isLogin, setLogIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/home"/>
    },
    {
      path: "/signup/",
      element: <Signup/>
    },
    {
      path: "/signin/",
      element: <Signin setLogIn={setLogIn} setToken={setToken} setUserName={setUserName}/> 
    },
    {
      path: "/home/",
      element: <Home isLogin={isLogin} userName={userName}/>
    },
    {
      path: "/home/:id",
      element: isLogin ? <Details token={token} userName={userName}/> : <Navigate replace to="/signin"/>
    }
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
