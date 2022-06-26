import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { getClient } from '../api/client';
import { TOAST_DURATION, TOAST_ERROR } from '../../../constants';

export const ClientForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const validate = Yup.object({
    phoneNumber: Yup.number()
      .typeError('Podaj numer')
      .required('Numer telefonu jest wymagany')
      .test(
        'len',
        'Numer telefonu musi mieć 9 znaków',
        val => val && val.toString().length === 9
      ),
  });
  useEffect(() => {
    console.log('state:', location.state);
  }, []);
  return (
    <Center w="100%" minH="800px">
      <Box p={4} w="30%">
        <Center>
          <Text fontSize="1xl" mb={10}>
            Wprowadź klienta 😳
          </Text>
        </Center>
        <Formik
          initialValues={{ phoneNumber: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await getClient(values.phoneNumber);
            if (result) {
              navigate(
                `/summary/${location.state.game.title}/${location.state.game.id}`,
                {
                  state: { ...location.state, client: result },
                }
              );
            } else {
              toast({
                title: 'Nie znaleziono klienta',
                description: 'Spróbuj ponownie',
                status: TOAST_ERROR,
                duration: TOAST_DURATION,
                isClosable: true,
                position: 'top',
              });
            }
            setSubmitting(false);
          }}
          validationSchema={validate}
        >
          {props => (
            <Form>
              <Field name="phoneNumber">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.phoneNumber && form.touched.phoneNumber
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="phoneNumber">Numer telefonu</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+48" />
                      <Input
                        {...field}
                        type="tel"
                        id="phoneNumber"
                        placeholder="numer telefonu"
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.phoneNumber}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Wprowadź
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};
