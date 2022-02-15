import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import './SignIn.css';
import { TCredintials } from 'types';

interface IProps {
  handleLogin: Function,
  userSettings: TCredintials,
  signInState: TCredintials
}


const validationSchema = yup.object({
  login: yup.string().required('Пожалуйста, введите имя пользователя'),
  password: yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пожалуйста, введите пароль'),
});

const SignIn: FC<IProps> = ({ handleLogin, userSettings, signInState }) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div>
      {userSettings.first_name && <p>{userSettings.first_name}</p>}

      <form className='signin' onSubmit={formik.handleSubmit}>
        <Stack sx={{ mt: 2, textAlign: 'center', gap: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Авторизация
          </Typography>
          <TextField
            fullWidth
            id='login'
            name='login'
            label='Имя пользователя'
            variant='standard'
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />

          <TextField
            fullWidth
            id='password'
            name='password'
            label='Пароль'
            type='password'
            variant='standard'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {signInState.error && <Alert severity="warning">{signInState.error}</Alert>}

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Войти
          </Button>

          <Link component={RouterLink} sx={{ fontFamily: 'Roboto' }} to="/signup" >
            Нет аккаунта? Зарегистрируйтесь!
          </Link>
        </Stack>
      </form>
    </div>
  );
};
export default SignIn;
