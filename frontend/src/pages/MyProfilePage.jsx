import React, { useEffect, useState } from "react";
import UserPost from "../components/UserPost";
import UserHeader from "../components/UserHeader";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const MyProfilePage = ({user:UserData}) => {

  const { username } = useParams();
  const [user, setUser] = useState(null);

  const getUsersProfile = async () => {
    const { data } = await axios.get(`/api/v1/user/profile/${username}`);
    setUser(data.user);
  };

  useEffect(() => {
      getUsersProfile();
  }, []);

  useEffect(() => {
    if(UserData === null){
      return <Navigate to={"/auth"}/>
    }
  },[])

  return (
    <>
      <UserHeader user={user} myProfile = {true} />
      <UserPost
        likes={12000}
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

export default MyProfilePage;
