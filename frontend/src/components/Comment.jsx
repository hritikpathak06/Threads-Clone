import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({comment,createdAt,likes,username,userAvatar}) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} width={"full"}>
        <Avatar src={userAvatar} size={"sm"} />
        <Flex gap={1} width={"full"} flexDirection={"column"}>
          <Flex
            width={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"small"} fontWeight={"bold"}>
             {username}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"small"} color={"gray.light"}>
            {createdAt}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <Actions />
          <Text fontSize={"small"} color={"gray.light"}>
            {likes} likes{" "}
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
};

export default Comment;
