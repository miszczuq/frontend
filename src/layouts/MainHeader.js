import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const MainHeader = () => {
  return (
    <Flex p={5} w="100%" justifyContent="center" alignItems="center">
      <Flex w="80%" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text fontSize="3xl" fontWeight="bold">
            Logo
          </Text>
        </Link>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
};
