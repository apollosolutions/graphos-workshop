import KBTLogo from './logo.png';
import {Box, Button, Flex, HStack} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p="4"
    >
      <Box as={Link} to="/">
        <img src={KBTLogo} alt="KBT Inc. logo" />
      </Box>
      <HStack>
      <Box as={Link} to="/account">
        <Button>Account</Button>
      </Box>
      <Box as={Link} to="/config">
        <Button variant='outline'>Configure</Button>
      </Box>
      </HStack>

    </Flex>
  );
}
