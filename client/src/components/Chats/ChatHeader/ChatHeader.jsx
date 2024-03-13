import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import React from 'react';
import { ChatContextState } from '../../../Context/chatContext';
import ProfileModal from '../ProfileModal/ProfileModal';

const ChatHeader = () => {
    const {user}= ChatContextState();

    return (
        <>
        <Box 
        display={'flex'} 
        justifyContent={'space-between'} 
        alignItems={'center'} 
        bg={'white'} 
        w='100%' p='5px 10px 5px 10px' 
        borderWidth={'5px'}>

            <Tooltip label="Search User for Chat" placement='bottom' bg='red.500' hasArrow aria-label='A tooltip'>
                <Button variant='ghost'><i className="fa-brands fa-searchengin"></i><Text display={{base:'none', md:'flex'}} px='2'>Search User</Text></Button>
            </Tooltip> 
            <Text fontSize={'2xl'} fontWeight={'700'} fontFamily={'work sans'}>Chat Book</Text>
            <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize={'2xl'} m={1}/>
                </MenuButton>
                <MenuList>
                    
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar 
                size='sm' 
                cursor={'pointer'} 
                name={user.name} 
                src={user.photo}/>
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                        <MenuItem>My Profile</MenuItem>
                    </ProfileModal>
                    <MenuDivider/>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu>
            </div>

        </Box>
        </>
    );
};

export default ChatHeader;