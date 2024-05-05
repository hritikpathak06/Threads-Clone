import { Container } from "@chakra-ui/react";
import React, { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/server";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import Homepage from "./pages/Homepage";
import MyProfilePage from "./pages/MyProfilePage";

const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Header = lazy(() => import("./components/Header"));

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
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/myProfile" element={<MyProfilePage user={user} />} />
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
