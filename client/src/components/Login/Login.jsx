import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPass, setShowPass]= useState(false);
    const [userDetails, setUserDetails]= useState({});
    const [loading, setLoading]= useState(false);
    const toast = useToast()
    const navigate= useNavigate();

    const handleBlur= (e)=>{
        e.preventDefault();
        const oldDetails= {...userDetails}
        oldDetails[e.target.name]= e.target.value;
        setUserDetails(oldDetails);
    }

    const handleSubmit= async()=>{
        setLoading(true);

        if(!userDetails.email || !userDetails.password){
            toast({
                title: 'Warning',
                description: "Please Fill all Fields",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        
        try{
            const response= await axios.post('http://localhost:3333/login', {email:userDetails.email, password:userDetails.password}, 
            {
                headers:
                {"Content-Type":"application/json"}
            });
            toast({
                title: "Login SuccessFull",
                description: 'Welcome on Chat Book',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            sessionStorage.setItem('user', JSON.stringify(response.data));
            setLoading(false);
            navigate('/chats');
        }
        catch(err){
            toast({
                title: 'Login Failed',
                description: "Invalid Email of Password",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    return (
        <VStack spacing={'15px'}>

            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name='email' defaultValue={userDetails.email} placeholder='Enter Your Name' type='email' onBlur={handleBlur}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input name='password' defaultValue={userDetails.password} placeholder='Enter Your Password' type={showPass ? 'text' : 'password'} onBlur={handleBlur}/>
                    <InputRightElement width={'4.5rem'}>
                        <Button h={"1.75rem"} size={'sm'} onClick={()=>setShowPass(!showPass)}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button onClick={handleSubmit} isLoading={loading} colorScheme='blue' width={'100%'} mt={2}>Login Now</Button>

            <Button onClick={()=>setUserDetails({email:'guest@example.com', password:'123456789'})} colorScheme='red' width={'100%'} mt={2}>Join as Guest</Button>
        </VStack>
    );
};

export default Login;