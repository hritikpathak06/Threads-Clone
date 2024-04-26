import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Lets talk About threads"
      />
      <UserPost
        likes={1600}
        replies={481}
        postImg="/post2.png"
        postTitle="Nice Picture"
      />
      <UserPost
        likes={1900}
        replies={481}
        postImg="/post3.png"
        postTitle="I love this guy"
      />
      <UserPost likes={120} replies={11} postTitle="Good Foiod" />
    </>
  );
};

export default UserPage;
