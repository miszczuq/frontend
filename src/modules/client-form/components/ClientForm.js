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
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

export const ClientForm = () => {
  const navigate = useNavigate();
  const params = useParams();
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log('values:', values);
              navigate(`/game/${params.game}/${params.gameId}/1`);
              setSubmitting(false);
            }, 2000);
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
