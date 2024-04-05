import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';

const UserList = ({result, accessChat}) => {
    return (
        <Box
            onClick={accessChat}
            cursor='pointer'
            bg='#E8E8E8'
            _hover={{
                background: '#38B2AC',
                color: 'white'
            }}
            w='100%'
            display='flex'
            alignItems='center'
            color='black'
            px={3}
            py={2}
            mb={2}
            borderRadius='lg'
        >
            <Avatar
                mr={2}
                size='sm'
                cursor='pointer'
                name={result.name}
                src={result.photo}
            />
            <Box>
                <Text>{result.name}</Text>
                <Text fontSize='xs'>
                    <b>Email:</b>
                    {result.email}
                </Text>
            </Box>
            
        </Box>
    );
};

export default UserList;