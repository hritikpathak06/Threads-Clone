import React, { useEffect, useState } from "react";
import UserPost from "../components/UserPost";
import UserHeader from "../components/UserHeader";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const MyProfilePage = ({ user: UserData }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const getUsersProfile = async () => {
    const { data } = await axios.get(`/api/v1/user/profile/${username}`);
    setUser(data.user);
  };

  const getMyPosts = async () => {
    const { data } = await axios.get(`/api/v1/post/myPost`, {
      withCredentials: "include",
    });
    setPosts(data.posts);
  };

  useEffect(() => {
    getUsersProfile();
    getMyPosts();
  }, []);

  useEffect(() => {
    if (UserData === null) {
      return <Navigate to={"/auth"} />;
    }
  }, []);

  return (
    <>
      <UserHeader user={user} myProfile={true} />
      {posts.map((p, index) => (
        <>
          <h3>{p._id}</h3>
          <UserPost
            key={index}
            post={p}
            likes={p.likes.length}
            replies={p.replies.length}
            postImg={p?.img || ""}
            postTitle={p.text}
            user={user}
            postId={p._id}
          />
        </>
      ))}
    </>
  );
};

export default MyProfilePage;
