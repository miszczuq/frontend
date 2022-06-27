import React, {useEffect, useState} from 'react';
import {
  Button,
  Center,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  useMediaQuery,
  Divider,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
export const Game = () => {
  const [showDefaultBody, setShowDefaultBody] = useState(true);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [askForInvoice, setAskForInvoice] = useState(false);
  const location = useLocation();
  const [newDiscount, setNewDiscount] = useState(location.state.game.discount);

  const navigate = useNavigate();

  const [isLessThan] = useMediaQuery('(max-width: 768px)');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const validate = Yup.object({
    discount: Yup.number()
      .typeError('Podaj numer')
      .max(100, 'Maksymalna wartość to 100')
      .required('Znizka jest wymagana'),
  });
  const updateDiscount = () => {
    location.state.game.discount = newDiscount;
  };
  useEffect(() => {
    console.log(location.state)
  }, [])
  return (
    <Center w="100%" minH="800px">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setShowDiscountInput(false);
          setAskForInvoice(false);
          setShowDefaultBody(true);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Propozycja znizki</ModalHeader>
          <ModalCloseButton />
          {showDefaultBody ? (
            <ModalBody>
              Czy akceptujesz znizke {location.state.game.discount}%?
            </ModalBody>
          ) : (
            ''
          )}

          {showDiscountInput ? (
            <>
              <ModalBody>
                Wprowadź znizkę
                <Formik
                  initialValues={{ discount: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                    setNewDiscount(values.discount);
                    setShowDiscountInput(false);
                    setAskForInvoice(true);
                    setSubmitting(false);
                  }}
                  validationSchema={validate}
                >
                  {props => (
                    <Form>
                      <Field name="discount">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.discount && form.errors.discount
                            }
                            marginY={5}
                          >
                            <InputGroup>
                              <InputLeftAddon children="%" />
                              <Input
                                {...field}
                                id="discount"
                                type="number"
                                placeholder="znizka"
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.discount}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <ModalFooter paddingX={0} justifyContent="flex-start">
                        <Button
                          type="submit"
                          colorScheme="teal"
                          mr={3}
                          isLoading={props.isSubmitting}
                        >
                          Zatwierdź
                        </Button>
                        <Button
                          colorScheme="gray"
                          onClick={() => {
                            setShowDefaultBody(true);
                            setShowDiscountInput(false);
                          }}
                        >
                          Cofnij
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </>
          ) : (
            ''
          )}
          {askForInvoice ? (
            <>
              {' '}
              <ModalBody>Czy wystawić fakturę?</ModalBody>
              <ModalFooter justifyContent="flex-start">
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={() => {
                    onClose();
                    updateDiscount();
                    navigate(
                      `/client/${location.state.game.title}/${location.state.game.id}`,
                      { state: { ...location.state } }
                    );
                  }}
                >
                  Nie
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    onClose();
                    updateDiscount();
                    navigate(
                      `/invoice/${location.state.game.title}/${location.state.game.id}`,
                      { state: { ...location.state } }
                    );
                  }}
                >
                  Tak
                </Button>
              </ModalFooter>
            </>
          ) : (
            ''
          )}
          {!showDiscountInput && !askForInvoice ? (
            <ModalFooter justifyContent="flex-start">
              <Button
                colorScheme="gray"
                mr={3}
                onClick={() => {
                  setShowDefaultBody(false);
                  setShowDiscountInput(true);
                }}
              >
                Nie
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => {
                  setShowDefaultBody(false);
                  setAskForInvoice(true);
                }}
              >
                Tak
              </Button>
            </ModalFooter>
          ) : (
            ''
          )}
        </ModalContent>
      </Modal>
      <Center
        borderWidth="1px"
        borderRadius="md"
        w="40%"
        p={4}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Center flexDirection="column">
          <Text fontSize="4xl" m={8}>
            {location.state.game.title}
          </Text>
          <Text w="100%" fontSize="md" textAlign="left">
            Platrofma: {location.state.game.platform}
          </Text>
          <Text w="100%" fontSize="md" textAlign="left">
            Gatunek: {location.state.game.genre}
          </Text>
            <Text w="100%" fontSize="md" textAlign="left">
            Stan: {location.state.game.quality}
            </Text>
              <Text w="100%" fontSize="md" textAlign="left">
            Cena: {location.state.game.sellPrice}
              </Text>

        </Center>
        <Center p={10} flexDirection={!isLessThan ? 'row' : 'column'}>
          <Button
            colorScheme="teal"
            m={15}
            onClick={() => {
              onOpen();
            }}
          >
            Zatwierdź
          </Button>
          <Button
            onClick={() => {
              navigate('/');
            }}
            colorScheme="gray"
          >
            Anuluj
          </Button>
        </Center>
      </Center>
    </Center>
  );
};
