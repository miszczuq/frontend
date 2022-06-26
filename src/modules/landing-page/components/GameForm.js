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
import { getGame } from '../api/game';
import { TOAST_DURATION, TOAST_ERROR } from '../../../constants';

export const GameForm = ({}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = Yup.object({
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
            Znajdź grę
          </Text>
        </Center>
        <Formik
          initialValues={{ id: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await getGame(values.id);
            if (result) {
              navigate(`/client/${result.title}/${result.id}`, {
                state: { game: result },
              });
            } else {
              toast({
                title: 'Nie znaleziono gry',
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
