import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { ChatContextState } from '../../../Context/chatContext';
import Loading from '../../Loading/Loading';
import UserList from '../../UserList/UserList';

const SideDrawer = ({isOpen, onClose}) => {
    const {user}= ChatContextState();
    // For Search //
    const [search, setSearch]= useState('');
    const [searchResult, setSearchResult]= useState('');
    const [searchPerform, setSearchPerform]= useState(false);
    const [loading, setLoading]= useState(false);
    const toast = useToast()

    const handleSearch= async()=>{
        if(!search){
            toast({
                description: "Please Fill Search Fields",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top-left'
            });
            setSearchPerform(false);
            return;
        }

            try{
                setLoading(true);
                const response= await axios.get(`http://localhost:3333?search=${search}`, 
                {headers: {authorization:`Bearer ${user.token}`}})
                setLoading(false);
                setSearchResult(response.data);
                setSearchPerform(true);
            }
            catch(err){
                toast({
                    title: 'Error on Search',
                    description: "Failed to Load Users",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
    }

    const accessChat=(userId)=>{

    }

    return (
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/> 
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>
                        Search User
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display='flex' pb={2}>
                            <Input
                                placeholder='Search by Name or Email'
                                mr={2}
                                value={search}
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>
                                Go
                            </Button>
                        </Box>
                        {loading ? <Loading/> : (
                            searchPerform && searchResult.length=== 0 ? <Text 
                            sx={{
                                display:'flex', justifyContent:'center',
                                alignItems:'center',
                                mt:'70px',
                                fontWeight:'bold',
                                color:'red',
                                fontSize:'25px'
                            }}
                                >
                                    NOT FOUND
                                </Text> : searchResult && searchResult.map(result=> (
                                <UserList key={result._id} result={result} accessChat={accessChat(result._id)}/>
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
    );
};

export default SideDrawer;