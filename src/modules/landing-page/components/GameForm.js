import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect } from 'react';

export const GameForm = ({}) => {
  const toast = useToast();
  const TOAST_DURATION = 2500;
  const navigate = useNavigate();
  const location = useLocation();

  const validate = Yup.object({
    name: Yup.string().max(25).required('Nazwa jest wymagana'),
    id: Yup.number().typeError('Podaj numer').required('Id jest wymagane'),
  });

  useEffect(() => {
    if (location.state === 'summary') {
      toast({
        title: 'Gra dodana',
        description: 'Udało się dodać grę',
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true,
        position: 'top',
      });
    }
  }, []);

  return (
    <Center w="100%" h="800px">
      <Box p={4} w="30%">
        <Center>
          <Text fontSize="1xl" mb={10}>
            Znajdź grę 😳
          </Text>
        </Center>
        <Formik
          initialValues={{ name: '', id: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log('values:', values);
              navigate(`/client/${values.name}/${values.id}`);
              setSubmitting(false);
            }, 2000);
          }}
          validationSchema={validate}
        >
          {props => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">Nazwa gry</FormLabel>
                    <Input {...field} id="name" placeholder="nazwa gry" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.id && form.touched.id}
                    mb={5}
                  >
                    <FormLabel htmlFor="id">Id gry</FormLabel>
                    <Input {...field} id="id" placeholder="id gry" />
                    <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Szukaj
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};
