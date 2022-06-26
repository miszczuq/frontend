import {
  Center,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
  useMediaQuery,
} from '@chakra-ui/react';
import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const Summary = () => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [percent, setPercent] = useState(0);
  const [sum, setSum] = useState(0);
  const location = useLocation();
  const sellPrice = location.state.game.sellPrice;
  const discount = location.state.game.discount;
  const navigate = useNavigate();
  const [isLessThan] = useMediaQuery('(max-width: 768px)');
  const count = () => {
    const percent = ((sellPrice / 100) * discount).toFixed(2);
    const sum = (sellPrice - percent).toFixed(2);
    setPercent(percent);
    setSum(sum);
  };
  useEffect(() => {
    count();
  }, []);
  return (
    <Center w="100%" minH="800px">
      <Grid
        borderWidth="1px"
        borderRadius="md"
        w="80%"
        p={10}
        templateColumns={!isLessThan ? 'repeat(2,1fr)' : 'repeat(1,1fr)'}
        gap={6}
      >
        <GridItem flexDirection="column">
          <Text fontSize="4xl" mb={5}>
            Podsumowanie
          </Text>
          <Text fontSize="sm" textAlign="left">
            Wszystkie dane się zgadzają?
          </Text>
          <Flex flexDirection="column" marginY={5} pe={10}>
            <Text fontSize="2xl" mb={14}>
              {location.state.game.title}
            </Text>
            <Text fontSize="sm">ilość: 1</Text>
            <Text fontSize="1xl" fontWeight="bold" mt={5}>
              ${sellPrice}
            </Text>
          </Flex>
        </GridItem>

        {location.state.invoice ? (
          <GridItem flexDirection="column">
            <Text>Dane do faktury</Text>
            <Divider marginY={5} />
            <Center justifyContent="space-between" mb={4}>
              <Text>Nazwa firmy</Text>
              <Text>{location.state.invoice.companyName}</Text>
            </Center>
            <Center justifyContent="space-between" mb={4}>
              <Text>Numer telefonu</Text>
              <Text>{location.state.invoice.phoneNumber}</Text>
            </Center>
            <Center justifyContent="space-between" mb={4}>
              <Text>NIP</Text>
              <Text>{location.state.invoice.nip}</Text>
            </Center>
          </GridItem>
        ) : (
          <></>
        )}
        <GridItem>
          <Text>Informacje zamówienia</Text>
          <Divider marginY={5} />
          <Flex justifyContent="space-between">
            <Flex flexDirection="column">
              <Text mb={5}>Polityka zwrotów</Text>
              {showPolicy ? (
                <Text mb={3}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis perferendis architecto laborum voluptates totam,
                  illum quisquam aperiam natus quo dolorem.
                </Text>
              ) : (
                ''
              )}
            </Flex>
            <Button
              onClick={() => {
                setShowPolicy(!showPolicy);
              }}
              p={2}
              bg="none"
              _hover={{ background: 'none' }}
              _focus={{ background: 'none' }}
            >
              {!showPolicy ? <SmallAddIcon /> : <SmallCloseIcon />}
            </Button>
          </Flex>
          <Divider marginY={5} />
          <Flex justifyContent="space-between">
            <Flex flexDirection="column">
              <Text mb={5}>Informacje o kliencie</Text>
              {showClient ? (
                <Flex flexDirection="column" mb={3}>
                  <Text>
                    Imię:{' '}
                    {location.state.client.firstName +
                      ' ' +
                      location.state.client.lastName}{' '}
                  </Text>
                  <Text>Adres: {location.state.client.address}</Text>
                  <Text>Numer telefonu: {location.state.client.contact}</Text>
                </Flex>
              ) : (
                ''
              )}
            </Flex>
            <Button
              onClick={() => {
                setShowClient(!showClient);
              }}
              p={2}
              bg="none"
              _hover={{ background: 'none' }}
              _focus={{ background: 'none' }}
            >
              {!showClient ? <SmallAddIcon /> : <SmallCloseIcon />}
            </Button>
          </Flex>
          <Divider marginY={5} />
        </GridItem>
        <GridItem flexDirection="column">
          <Center justifyContent="space-between" mb={4}>
            <Text>Cena</Text>
            <Text>${sellPrice}</Text>
          </Center>
          <Center justifyContent="space-between" mb={4}>
            <Text>Znizka</Text>
            <Text>{percent}</Text>
          </Center>
          <Divider />
          <Center justifyContent="space-between" mt={4}>
            <Text>Suma</Text>
            <Text>{sum}</Text>
          </Center>
          <Button
            colorScheme="teal"
            mt={10}
            onClick={() => {
              navigate('/', { state: 'summary' });
            }}
          >
            Potwierdź
          </Button>
        </GridItem>
      </Grid>
    </Center>
  );
};
