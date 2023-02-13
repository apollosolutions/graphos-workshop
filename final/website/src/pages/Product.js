import Spinner from '../components/Spinner';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import {Error} from './Error';
import {
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  SimpleGrid,
  Button,
  Select,
  Tag,
  Divider,
  TagLabel,
  TagLeftIcon,
  useToast
} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {htmlDecode, htmlParser} from '../helpers';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productId: ID!) {
    product(id: $productId) {
      id
      name
      description
      price
      images
      ... @defer {
        variants {
          colorway
          size
          inStock
          id
        }
      }
    }
  }
`;

export default function Product() {
  const toast = useToast()

  const [currentImage, setImage] = useState("");
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [inStockSizes, setInStockSizes] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const {id} = useParams();

  const setVariantOptions = (product) => {
    if (product) {
      const colorOptions = product.variants
        .map(variant => variant.colorway)
        .filter((color, index, colors) => colors.indexOf(color) === index);

      setColorOptions(colorOptions);
    
      const allSizes = product.variants
        .filter(variant => variant.colorway === selectedColor)

      const inStockSizeOfColor = allSizes
        .filter(variant => (variant.inStock))
        .map(variant => variant.size);

      setSizeOptions(allSizes.map(variant => variant.size));
      setInStockSizes(inStockSizeOfColor)
    }
  }

  useEffect(() => {
    setVariantOptions(data.product, selectedColor);
  }, [selectedColor]);

  const initializePage = (data) => {
    setImage(data.product.images[0]);
    setColor(data.product.variants[0].colorway);
    setSize(data.product.variants[0].size);
  }

  const response = useQuery(GET_PRODUCT_DETAILS, {
    variables: {productId: id},
    onCompleted: (data) => {
      initializePage(data);
    }
  });


  const {loading, error, data = {}} = response;
  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;
  const {name, description, images} = data?.product || {};

  return (
    <>
      {data && (
        <SimpleGrid columns={2} px="12" spacing="6" mb="12">
          <Stack direction="column" spacing="6">
            <Image
              src={currentImage}
              alt={name}
              className="product__image"
              objectFit="cover"
              borderRadius="12"
            />
            <Stack direction="row" alignContent={"center"}>
            { 
              images?.map(imageUri => {
                const activeImage = (imageUri === currentImage);

                return (
                  <Image 
                    key={imageUri}
                    className={`product__thumbnail ${activeImage ? "product__thumbnail--active" : null}`}
                    src={imageUri}
                    onClick={() => setImage(imageUri)}
                  />
                )
              })
            }
            </Stack>
          </Stack>

          <Stack direction="column" spacing="2">
            <Heading as="h1" size="lg">
              {htmlDecode(name)}
            </Heading>
            <Flex direction="column" justify="space-between">
              <Heading as="h2" py="4" size="md" mb="2">
                About this product
              </Heading>
              <Text fontWeight="regular" mr="1">
                {htmlParser(description)}
              </Text>
              <Divider mt={4} mb={4} />
            </Flex>

            <p><b>Color:</b> {selectedColor}</p>
                <Stack direction="row">
                  <ul>
                    {
                      colorOptions.map(color => (
                        <Tag 
                          className='product__variant_tag'
                          onClick={() => setColor(color)}
                          variant='subtle'
                          ml={2}>
                          { color === selectedColor ? <TagLeftIcon boxSize='12px' as={FaCheck} /> : null }
                          <TagLabel>{color}</TagLabel>
                        </Tag>
                     ))
                    }
                  </ul>
                </Stack>
            

            <p><b>Size:</b> {selectedSize.toUpperCase()}</p>

            {
              data.product?.variants ? 
              (
                <Stack direction="row">
                  <ul>
                    {
                      sizeOptions.map(size => (
                          <Tag
                            className={
                              (inStockSizes.indexOf(size) > -1) ? 'product__variant_tag' : 'product__variant_tag--out'
                            }
                            onClick={() => setSize(size)} 
                            variant={size === selectedSize ? 'solid' : 'outline'}
                            ml={2}>
                              {size.toUpperCase()}
                          </Tag>
                      ))
                    }
                  </ul>
                </Stack>
              ) : 
              <p className="product__loading">...</p>
            }

            <Flex direction="row">
            <Stack flex="1" direction="column" spacing="12">
              <Stack
                direction="column"
                spacing="4"
                divider={<StackDivider borderColor="gray.200" />}
              >
                <p>
                  <b>Quantity:</b>
                  <Select variant='outline' mt={4} placeholder='1'>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>9</option>
                  </Select>
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: 'Added to Cart',
                      description: `${data.product.name} - ${selectedColor} - ${selectedSize}`,
                      status: 'success',
                      duration: 4500,
                      isClosable: true,
                    })
                  }}
                  colorScheme='blue'
                  leftIcon={<FaShoppingCart />}>
                  Add to Cart
                </Button>
              </Stack>
            </Stack>
          </Flex>
          </Stack>
        </SimpleGrid>
      )}
    </>
  );
}
