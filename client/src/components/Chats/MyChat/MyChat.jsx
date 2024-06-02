import React, { useEffect, useState } from 'react'
import { ChatContextState } from '../../../Context/chatContext';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import Loading from '../../Loading/Loading';
import { getSender } from '../../../config/ChatLogic';

const MyChat = () => {
    const [loggedUser, setLoggedUser]= useState();
    const {user, selectedChat, setSelectedChat, chat, setChat}= ChatContextState();

    const toast= useToast()

    const fetchChats= async()=>{
        try {
            const response= await axios.get(`http://localhost:3333/chat/allChat`,
                {headers: {
                    authorization:`Bearer ${user.token}`
                }}
            );
            setChat(response.data);
            console.log(response.data)
        } 
        catch (error) {
            toast({
                title: 'Error!!!',
                description: "Failed to load Chats",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
        fetchChats();
    }, [])

    return (
        <Box
            d={{base: selectedChat ? "none" : "flex", md: 'flex'}}
            flexDir={"column"}
            alignItems='center'
            p={3}
            bg="white"
            w={{base: "100%", md:"31%"}}
            borderRadius={"lg"}
            borderWidth='1px'
        >
            <Box
                pb={3}
                px={3}
                fontSize={{base:'28px', md: '30px'}}
                fontFamily='Work sans'
                d='flex'
                w='100%'
                justifyContent='space-between'
                alignItems='center'
            >
                My Chat
                <Button
                    d='flex'
                    fontSize={{base:'17px', md: '10px', lg:'17px'}}
                    rightIcon={<AddIcon/>}
                >
                    New Group Chat
                </Button>
            </Box>

            <Box
                d='flex'
                flexDir='column'
                p={3}
                bg='#F8F8F8'
                w='100%'
                h='100%'
                borderRadius='lg'
                overflowY='hidden'
            >
                {chat ? (
                    <Stack overflowY='scroll'>
                        {chat.map((chat)=> (
                            <Box
                            key={chat._id} 
                            onClick={()=>setSelectedChat(chat)}
                            cursor='pointer'
                            bg={setSelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat === chat ? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius='lg'
                            >
                                <Text>
                                    {!chat.isGroup ? getSender(loggedUser, chat.users) : chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) :
                    <Loading/>
                }
            </Box>
        </Box>
    )
}

export default MyChat
