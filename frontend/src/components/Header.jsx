import { Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  
  return (
    <>
      <Flex justifyContent={"center"} mt={6} mb={"12"}>
        <Image
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          w={6}
          cursor={"pointer"}
          alt="logo"
          onClick={toggleColorMode}
        />
        <Link to={"/adjsdjsd"}>
          <button>Visit Profile Page</button>
        </Link>
      </Flex>
    </>
  );
};

export default Header;
