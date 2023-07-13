import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {Stack, Divider, Stat, StatLabel, StatHelpText, Heading, Text, HStack, useToast, VStack, Input, InputLeftAddon, InputGroup, Button} from '@chakra-ui/react';
import { DEFAULT_ROUTER_URL } from '../config';

export const Connection = () => {
    const toast = useToast();
    const url = localStorage.getItem('router-url') || DEFAULT_ROUTER_URL;
    let [value, setUrl] = useState(url);

    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    const setValue = (urlValue) => {
        setUrl(urlValue);
        localStorage.setItem('router-url', urlValue);
        toast({
            title: 'Router URL Set',
            description: `GraphQL queries will be made to ${urlValue}. Reloading your window to persist changes....`,
            status: 'success',
            duration: 1000,
            isClosable: true,
            position: 'top'
        });
        setTimeout(() => window.location.reload(), 800);
    };

    return (
        <Stack direction="column" px="12" spacing="6" mb="12">
            <Stack direction="row">
                <Heading as="h5">
                Configuration
                </Heading>
            </Stack>

            <Divider />

            <VStack align={"initial"}>
                <Stat size="sm" className="stat__card">
                    <Heading as="h3" size="md">Router URL</Heading>
                    <Text fontWeight="regular" mb={5}>
                        Set the URL of your deployed router for Apollo Client to forward GraphQL operations to. Note, this only applies to your browser.               </Text>
                    <Heading size="xl"></Heading>
                    <InputGroup size='sm'>
                        <InputLeftAddon children='https://' />
                        <Input placeholder={value} onChange={handleChange} value={value}/>
                    </InputGroup>
                        
                    <HStack justify={"end"} mt={5}>
                        <Button colorScheme='green' size='sm' onClick={() => setValue(value)}>
                            Set URL
                        </Button>
                        <Button colorScheme='gray'  variant='outline' size='sm' onClick={() => setValue(DEFAULT_ROUTER_URL)}>
                            Reset to Default
                        </Button>
                    </HStack>
                </Stat>
            </VStack>
        </Stack>
    )
};

export default Connection;
