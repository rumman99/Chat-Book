import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
    const [showPass, setShowPass]= useState(false);
    const [userDetails, setUserDetails]= useState({});

    const handleBlur= (e)=>{
        e.preventDefault();
        const oldDetails= {...userDetails}
        oldDetails[e.target.name]= e.target.value;
        setUserDetails(oldDetails);
    }

    return (
        <VStack spacing={'15px'}>

            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name='email' placeholder='Enter Your Name' type='email' onBlur={handleBlur}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input name='password' placeholder='Enter Your Password' type={showPass ? 'text' : 'password'} onBlur={handleBlur}/>
                    <InputRightElement width={'4.5rem'}>
                        <Button h={"1.75rem"} size={'sm'} onClick={()=>setShowPass(!showPass)}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme='blue' width={'100%'} mt={2}>Login Now</Button>
            <Button onClick={()=>setUserDetails({email:'guest@example.com', password:'123456789'})} colorScheme='red' width={'100%'} mt={2}>Join as Guest</Button>
        </VStack>
    );
};

export default Login;