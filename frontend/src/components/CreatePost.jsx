import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import axios from "axios";

const CreatePost = ({ user }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleCreatePost = async () => {
    setLoading(true);
    const { data } = await axios.post(
      `/api/v1/post/create`,
      {
        text,
        img,
      },
      {
        withCredentials: "includer",
      }
    );
    setLoading(false);
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {/* {remainingChar}/{MAX_CHAR} */}
              </Text>

              <Box position={"relative"}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  position={"absolute"}
                  opacity={0}
                  cursor={"pointer"}
                />

                <BsFillImageFill
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  size={16}
                  cursor={"pointer"}
                />
              </Box>
            </FormControl>
            {img && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={img} alt="Selected img" />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
