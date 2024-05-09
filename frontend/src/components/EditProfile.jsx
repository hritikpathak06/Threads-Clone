import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ user }) {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const [profilePic, setProfilePic] = useState(user?.profilePic);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { data } = await axios.put(
      `/api/v1/user/update/profile/${user?._id}`,
      {
        name,
        email,
        bio,
        profilePic,
      },
      {
        withCredentials: "include",
      }
    );
    setUser({
      user: data.user,
    });
    toast({
      title: "Profile Updated Successfully",
      colorScheme: "green",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
    setLoading(false);
    navigate(`/profile/${user?._id}`);
  };

  return (
    <Flex minH={"60vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Update Your Profile
        </Heading>
        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={profilePic}></Avatar>
            </Center>
            <Center w="full">
              <Button w="full">
                <Input
                  type="file"
                  accept="image/*"
                  sx={{ opacity: 0 }}
                  style={{ cursor: "pointer" }}
                  onChange={handleImageChange}
                />
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Your Bio"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate(`/profile/${user?._id}`)}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleUpdate}
            isLoading={loading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
