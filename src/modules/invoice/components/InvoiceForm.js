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
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setInvoice } from '../api/invoice';

export const InvoiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const validate = Yup.object({
    companyName: Yup.string().required('Nazwa firmy jest wymagana'),
    phoneNumber: Yup.number()
      .typeError('Podaj numer')
      .required('Numer telefonu jest wymagany')
      .test(
        'len',
        'Numer telefonu musi mieć 9 znaków',
        val => val && val.toString().length === 9
      ),
    nip: Yup.number()
      .typeError('Podaj numer')
      .required('Nip jest wymagany')
      .test(
        'len',
        'Nip musi mieć 10 znaków',
        val => val && val.toString().length === 10
      ),
  });

  return (
    <Center w="100%" minH="800px">
      <Box p={4} w="30%">
        <Center>
          <Text fontSize="1xl" mb={10}>
            Wprowadź dane do faktury 😳
          </Text>
        </Center>
        <Formik
          initialValues={{ companyName: '', phoneNumber: '', nip: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await setInvoice(values);
            if (result) {
              navigate(
                `/summary/${location.state.game.title}/${location.state.game.id}`,
                { state: { ...location.state, invoice: values } }
              );
            }
            setSubmitting(false);
          }}
          validationSchema={validate}
        >
          {props => (
            <Form>
              <Field name="companyName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.companyName && form.touched.companyName
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="companyName">Nazwa firmy</FormLabel>
                    <Input
                      {...field}
                      id="companyName"
                      placeholder="nazwa firmy"
                    />
                    <FormErrorMessage>
                      {form.errors.companyName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phoneNumber">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.phoneNumber && form.touched.phoneNumber
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="phoneNumber">Nazwa firmy</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+48" />
                      <Input
                        {...field}
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
              <Field name="nip">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.nip && form.touched.nip}
                    mb={5}
                  >
                    <FormLabel htmlFor="nip">Nazwa firmy</FormLabel>
                    <Input {...field} id="nip" placeholder="NIP" />
                    <FormErrorMessage>{form.errors.nip}</FormErrorMessage>
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
