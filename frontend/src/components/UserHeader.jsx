import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = ({ user, myProfile }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Profile Copied Successfully",
        colorScheme: "green",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {user?.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"small"}>{user?.username}</Text>
              <Text
                fontSize={"x-small"}
                bg={"gray.dark"}
                color={"gray.light"}
                p={1}
                borderRadius={"full"}
              >
                therad.next
              </Text>
            </Flex>
          </Box>
          <Avatar
            name="Mark Zukerberg"
            src={user?.profilePic}
            size={{
              base: "md",
              md: "xl",
            }}
          />
        </Flex>
        <Text>{user?.bio}</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>{user?.followers.length} followers</Text>
            <Box w={1} height={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <NavLink color={"gray.light"}>instagram.com</NavLink>
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Box className="icon-container">
              <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box className="icon-container">
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem onClick={copyUrl} bg={"transparent"}>
                      Copy Link
                    </MenuItem>
                    {myProfile && (
                      <MenuItem bg={"transparent"} onClick={() => navigate("/update-profile")}>Update Profile</MenuItem>
                    )}
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex w={"full"}>
          <Flex
            flex={1}
            borderBottom={"1px solid white"}
            justifyContent={"center"}
            pb={3}
            cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>
          <Flex
            flex={1}
            borderBottom={"1px solid gray"}
            justifyContent={"center"}
            pb={3}
            cursor={"pointer"}
            color={"gray.light"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default UserHeader;
