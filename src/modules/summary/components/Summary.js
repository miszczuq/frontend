import {
  Center,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const Summary = () => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showClient, setShowClient] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  return (
    <Center w="100%" minH="800px">
      <Grid
        borderWidth="1px"
        borderRadius="md"
        w="80%"
        p={10}
        templateColumns="repeat(2,1fr)"
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
              {params.game}
            </Text>
            <Text fontSize="sm">ilość: 1</Text>
            <Text fontSize="1xl" fontWeight="bold" mt={5}>
              $250
            </Text>
          </Flex>
        </GridItem>

        <GridItem flexDirection="column">
          <Center justifyContent="space-between" mb={4}>
            <Text>Cena</Text>
            <Text>$200</Text>
          </Center>
          <Center justifyContent="space-between" mb={4}>
            <Text>VAT</Text>
            <Text>$50</Text>
          </Center>
          <Divider />
          <Center justifyContent="space-between" mt={4}>
            <Text>Suma</Text>
            <Text>$250</Text>
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
                  <Text>Imię: Klient 😜</Text>
                  <Text>Adres: Adres 😜</Text>
                  <Text>Numer telefonu: Numer telefonu 😜</Text>
                  <Text>Psiuta: Psiuta 😜</Text>
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
      </Grid>
    </Center>
  );
};
