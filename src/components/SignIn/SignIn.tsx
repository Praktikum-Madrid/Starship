// Login

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './SignIn.css';
import Header from '../Header/Header';

const validationSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Header />
      <div>Логин</div>
      <form className='signin' onSubmit={formik.handleSubmit}>
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
export default SignIn;
