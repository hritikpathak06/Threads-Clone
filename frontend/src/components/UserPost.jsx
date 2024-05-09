import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const UserPost = ({ likes, replies, postImg, postTitle, user }) => {
  return (
    <>
      <NavLink to={"/markzuckerberg/post/1"}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size={"md"} name="markzuckerberg" src={user.profilePic} />
            <Box width={"1px"} height={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} width={"full"}>
              <Avatar
                size={"sm"}
                name="john doe"
                src="https://bit.ly/dan-abramov"
                position={"absolute"}
                top={"0px"}
                left={"20px"}
                p={"2px"}
              />
              <Avatar
                size={"sm"}
                name="john doe"
                src="https://bit.ly/tioluwani-kolawole"
                position={"absolute"}
                bottom={"-10px"}
                right={"5px"}
                p={"2px"}
              />
              <Avatar
                size={"sm"}
                name="john doe"
                src="https://bit.ly/kent-c-dodds"
                position={"absolute"}
                top={"0px"}
                bottom={"0px"}
                left={"4px"}
                p={"2px"}
              />
            </Box>
          </Flex>
          <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex width={"full"} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {user.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"small"} color={"gray"}>
                  1d
                </Text>
                <BsThreeDots />
              </Flex>
            </Flex>
            <Flex fontSize={"small"}>{postTitle}</Flex>
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray"}>
              <Image src={postImg} w={"full"} />
            </Box>
            <Actions likes={likes} replies={replies} />
          </Flex>
        </Flex>
      </NavLink>
    </>
  );
};

export default UserPost;
