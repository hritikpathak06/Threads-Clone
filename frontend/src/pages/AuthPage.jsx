import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Homepage from "./Homepage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthPage = ({user}) => {
  const {isAuthenticated} = useSelector((state) => state.userData);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  if(isAuthenticated){
    navigate("/")
  }

  return (
    <>
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Signup setToggle={setToggle} />
      )}
    </>
  );
};

export default AuthPage;
