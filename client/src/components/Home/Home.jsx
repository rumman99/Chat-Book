import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Home = () => {

    return (
        <Container maxW="xl" centerContent>
            <Box d='flex'
            justifyContent="center" p={3} bg={"blue.100"} w="100%" m='40px 0 10px 0' borderRadius='lg' borderWidth='1px'>
                <Text fontSize={'4xl'} fontFamily={'Work Sans'} textAlign={'Center'} color={'black'}>My Chat App</Text>
            </Box>

            <Box bg={"white"} w={'100%'} p={4} borderRadius='lg' borderWidth={'1px'} textAlign={'Center'} fontFamily={'Work Sans'} color={'black'}>
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList mb={'1em'}>
                        <Tab width={'50%'}>LogIn</Tab>
                        <Tab width={'50%'}>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Login/>
                        </TabPanel>
                        <TabPanel>
                        <Register/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Home;