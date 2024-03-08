import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Register = () => {
    const [showPass, setShowPass]= useState(false);
    const [userDetails, setUserDetails]= useState({});
    const [file, setFile]= useState('')
    const [passError, setPassError]= useState('')

    const handleBlur= (e)=>{
        e.preventDefault();
        const oldDetails= {...userDetails}
        oldDetails[e.target.name]= e.target.value;
        setUserDetails(oldDetails);

        if(e.target.name === 'confirmPassword'){
            if(e.target.value !== userDetails.password){
                setPassError('Password Not Matched')
            }
            else{
                setPassError('');
            }
        }
    }

    const handleFile=(e)=>{

    }

    return (
        <VStack spacing={'15px'}>

            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input name='name' placeholder='Enter Your Name' type='text' onBlur={handleBlur}/>
            </FormControl>

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

            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input name='confirmPassword' placeholder='Enter Your Password' type='password' onBlur={handleBlur}/>
                {passError && <Text color={'red'}>{`${passError}!!!`}</Text>}
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="photo">Upload Photo</FormLabel>
                <Input type='file' p={1.5} accept='image/*'/>
            </FormControl>

            <Button colorScheme='blue' width={'100%'} mt={2}>Register Now</Button>
        </VStack>
    );
};

export default Register;