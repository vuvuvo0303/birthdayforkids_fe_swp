/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "../register";
export const LoginPage = ({ isRegister = false }) => {
    return (
        <Flex w="full" minH="100vh" justifyContent="center" alignItems="center" bgColor="#faebf7">
            <Flex minW="65%" h="80vh" justifyContent="flex-end" borderRadius="10px" shadow="0 0 10px gray" bg="url(https://images6.alphacoders.com/135/1350372.png)" bgSize="cover" bgPos="bottom">
                <Box p="50px" bg="white" borderRadius="10px" overflow="auto">
                    {
                        isRegister ? <RegisterForm /> : <LoginForm />
                    }
                </Box>
            </Flex>
        </Flex>
    );
};
