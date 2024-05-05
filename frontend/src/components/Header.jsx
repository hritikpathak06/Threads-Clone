import {
  Button,
  Flex,
  Image,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated } = useSelector((state) => state.userData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data } = await axios.post(`/api/v1/user/logout`, {
      withCredentials: "include",
    });
    console.log(data);
  };

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

        {isAuthenticated && (
          <Flex ml={"auto"}>
            <Popover>
              <PopoverTrigger>
                <Button>Profile</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </PopoverHeader>
                <PopoverHeader
                  onClick={handleLogout}
                  sx={{ cursor: "pointer" }}
                >
                  Logout
                </PopoverHeader>
                <PopoverBody>Are you sure you want to logout?</PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Header;
