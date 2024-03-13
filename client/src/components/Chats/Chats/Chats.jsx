import React from 'react';
import { ChatContextState } from '../../../Context/chatContext';
import { Box, Flex } from '@chakra-ui/react';
import ChatHeader from '../ChatHeader/ChatHeader';
import MyChat from '../MyChat/MyChat';
import ChatBox from '../ChatBox/ChatBox';

const Chats = () => {
    const {user}= ChatContextState();

    return (
        <div style={{width:"100%"}}>
            {user && <ChatHeader/>}
            <Flex justifyContent='space-between' w='100%' h='100vh' p='10px'>
                {user && <MyChat/>}
                {user && <ChatBox/>}
            </Flex>
        </div>
    );
};

export default Chats;