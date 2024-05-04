import React from "react";
import AuthPage from "./AuthPage";

const Homepage = ({ user }) => {
  if (!user) {
    return <AuthPage />;
  }

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Homepage;
