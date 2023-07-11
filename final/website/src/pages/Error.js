import PropTypes from 'prop-types';
import React from 'react';
import {Box, Heading, Text, VStack} from '@chakra-ui/react';

export const Error = ({children, code, error}) => {
  let errorMessage = (typeof error === "string") ? error : error.message;

  if (errorMessage === 'Failed to fetch') {
    const url = localStorage.getItem('router-url');
    errorMessage = `[Failed to fetch] Could not connect to your router URL, check to make sure your router has been deployed successfully. See if you can access this page successfully, https://${url}`;
  }

  return (
    <VStack spacing="12">
    <VStack textAlign="center">
      <Heading size="4xl">{code}</Heading>
      <Heading fontSize="3xl">Houston, something went wrong on our end</Heading>
      <Text>Please review the information below for more details.</Text>
    </VStack>
    {errorMessage && (
      <Box
        maxW="500px"
        p="6"
        border="2px"
        borderRadius="8px"
        borderColor="brand.light"
      >
        <Text color="brand.error">{errorMessage}</Text>
      </Box>
    )}
    {children}
  </VStack>
  )
};

Error.propTypes = {
  code: PropTypes.string,
  children: PropTypes.node
};
