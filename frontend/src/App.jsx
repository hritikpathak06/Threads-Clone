import { Container } from "@chakra-ui/react";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const Header = lazy(() => import("./components/Header"));

const App = () => {
  return (
    <>
      <Container maxW={"630px"}>
        <Header />
        <Routes>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
