import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { GameForm } from './modules/landing-page/components/GameForm';
import { Game } from './modules/game/components/Game';
import { Summary } from './modules/summary/components/Summary';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClientForm } from './modules/client-form/components/ClientForm';
import { InvoiceForm } from './modules/invoice/components/InvoiceForm';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<GameForm />} />
            <Route path="/game/:game/:gameId/" element={<Game />} />
            <Route path="/client/:game/:gameId" element={<ClientForm />} />
            <Route path="/invoice/:game/:gameId/" element={<InvoiceForm />} />
            <Route path="/summary/:game/:gameId/" element={<Summary />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
};
