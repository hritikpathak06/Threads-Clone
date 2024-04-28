import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";



const PostPage = () => {
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="mark" />
          <Flex alignItems={"center"}>
            <Text fontSize={"small"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" width={4} height={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"small"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let talk about threads</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray"}>
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"small"}>
          238 replies
        </Text>
        <Box
          width={0.5}
          height={0.5}
          borderRadius={"full"}
          bg={"gray.light"}
        ></Box>
        <Text color={"gray.light"} fontSize={"small"}>
          2387 likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"xx-large"}>👋</Text>
          <Text color={"gray.light"}>
            Get the app to like, and reply and post
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment={"Looks Great pic"}
        createdAt={"2d"}
        likes={300}
        username={"John Doe"}
        userAvatar={"https://bit.ly/dan-abramov"}
      />
      <Comment
        comment={"Looks Great pic"}
        createdAt={"2d"}
        likes={300}
        username={"John Doe"}
        userAvatar={"https://bit.ly/dan-abramov"}
      />
      <Comment
        comment={"Looks Great pic"}
        createdAt={"2d"}
        likes={300}
        username={"John Doe"}
        userAvatar={"https://bit.ly/dan-abramov"}
      />
    </>
  );
};

export default PostPage;
