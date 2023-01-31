import Spinner from '../components/Spinner';
import {Error} from './Error';
import {
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

//Create a GET_PRODUCT_DETAILS query here! 

export default function Product() {
  const {id} = useParams();

  // PARSE error, loading, and data here! Hint: useQuery

  return (
    <>
      {data && (
        <Stack direction="column" px="12" spacing="6" mb="12">
          <Heading as="h1" size="lg">
            {name}
          </Heading>
          <Stack direction="column" spacing="6">
            <Image
              src={images[0]}
              alt={name}
              objectFit="cover"
              width="30%"
              height="auto"
              borderRadius="12"
            />
            <Flex direction="column" justify="space-between">
              <Heading as="h2" py="4" size="md" mb="2">
                About this product
              </Heading>
              <Text fontWeight="regular" mr="1">
                {description}
              </Text>
            </Flex>
          </Stack>
          <Flex direction="row">
            <Stack flex="1" direction="column" spacing="12">
              <Stack
                direction="column"
                spacing="4"
                divider={<StackDivider borderColor="gray.200" />}
              >
                <Heading as="h2" size="md" mb="2" marginTop={8}>
                  Product Variants
                </Heading>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
    </>
  );
}
