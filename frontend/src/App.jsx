import { Container } from "@chakra-ui/react";
import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/authSlice";

import MyProfilePage from "./pages/MyProfilePage";
import EditProfile from "./components/EditProfile";
import CreatePost from "./components/CreatePost";
const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Header = lazy(() => import("./components/Header"));
const Homepage = lazy(() => import("./pages/Homepage"));

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.userData);

  const getMyProfile = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/me`);
      dispatch(
        setUser({
          user: data.user,
        })
      );
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [isAuthenticated]);

  return (
    <>
      <Container maxW={"630px"}>
        <Header />
        {user && <CreatePost />}
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route
            path="/update-profile"
            element={user ? <EditProfile user={user} /> : <AuthPage />}
          />

          <Route
            path="/profile/:username"
            element={user ? <MyProfilePage user={user} /> : <AuthPage />}
          />
          <Route path="/auth" element={<AuthPage user={user} />} />
          <Route path="/:username" element={<UserPage />} />
          <Route
            path="/:username/post/:pid"
            element={isAuthenticated ? <PostPage /> : <AuthPage />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
