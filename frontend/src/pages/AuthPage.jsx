import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Homepage from "./Homepage";

const AuthPage = ({user}) => {
  const [toggle, setToggle] = useState(true);

  if(user){
    return <Homepage/>
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
