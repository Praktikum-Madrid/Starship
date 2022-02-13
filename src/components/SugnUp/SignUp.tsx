// Login

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './SignUp.css';
import Header from '../Header/Header';

const validationSchema = yup.object({
  first_name: yup.string().required('First_name is required'),
  second_name: yup.string().required('Second_name is required'),
  login: yup.string().required('Login is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  phone: yup.string().required('Phone is required'),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Header />
      <div>Регистрация</div>
      <form className='login' onSubmit={formik.handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            id='first_name'
            name='first_name'
            label='FirstName'
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id='second_name'
            name='second_name'
            label='SecondName'
            value={formik.values.second_name}
            onChange={formik.handleChange}
            error={
              formik.touched.second_name && Boolean(formik.errors.second_name)
            }
            helperText={formik.touched.second_name && formik.errors.second_name}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id='phone'
            name='phone'
            label='Phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id='login'
            name='login'
            label='Login'
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
