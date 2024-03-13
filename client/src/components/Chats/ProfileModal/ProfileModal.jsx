import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
            <>
            { children ? <span onClick={onOpen}>{children}</span> : <IconButton 
                onClick={onOpen} 
                display={{base:'flex'}} 
                icon={<ViewIcon/>}
            /> }

            <Modal size={{base: 'xs', md: 'lg'}} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent h={{base: '280px', md: '450px'}}>
                <ModalHeader
                    fontSize={{base: '24px', md: '40px'}}
                    fontFamily={'Work sans'}
                    textAlign={'center'}
                >{user.name}</ModalHeader>

                <ModalBody 
                    display={'flex'}
                    justifyContent={'center'}
                    flexDir={'column'}
                    alignItems={'center'}
                    >
                <Image 
                        src={user.photo}
                        borderRadius={'full'}
                        boxSize={{base: '100px', md: '200px'}}
                        alt={user.name}
                    />
                    <Text
                        fontSize={{base: '14px', md: '22px'}}
                        fontFamily={'Work sans'}
                        mt={5}
                    >
                        Email:{user.email}
                    </Text>
                </ModalBody>
                    
                <ModalFooter>
                <Button size={{base: 'xs', md: 'md'}} colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
            </>
    );
};

export default ProfileModal;