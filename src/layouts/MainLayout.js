import { Center, Container, Flex } from '@chakra-ui/react';
import { MainHeader } from './MainHeader';
import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <Container height="100%" w="100%" maxW="unset" maxH="unset">
      <MainHeader />
      {children}
    </Container>
  );
};
