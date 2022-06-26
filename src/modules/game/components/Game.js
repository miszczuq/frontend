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
  const [newDiscount, setNewDiscount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
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
          <Text w="80%" fontSize="sm" textAlign="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quia
            voluptates rem accusamus architecto illo quaerat voluptatem vero sed
            cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam quia quaerat non dolorum aperiam omnis ullam cupiditate
            nobis dignissimos optio. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa animi modi qui eius voluptate repellat
            tenetur facere corrupti molestias natus dolorem aliquid cupiditate,
            assumenda impedit, expedita reiciendis dicta perspiciatis, ex ipsam
            rem quia. Unde porro quaerat veritatis vitae animi fuga earum, quam
            pariatur facilis. Quia et aut modi placeat ex commodi, error,
            repellendus quae architecto itaque debitis illo, perspiciatis totam
            quam. Fugit neque nam nemo architecto asperiores quos dicta aliquam
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
