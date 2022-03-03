import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { TCredintials } from 'types';
import Auth from 'api/Auth';
import { logIn } from 'store/reducers/auth';
import { setUserSettings } from 'store/reducers/settings';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  login: yup.string()
    .required('Пожалуйста, введите имя пользователя'),
  password: yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пожалуйста, введите пароль'),
});

const SignIn = () => {
  // Стейт о состоянии авторизации (успех/провал?)
  const [signInState, setSignInState] = useState({
    error: '',
  });

  const dispatch = useDispatch();

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

  // FIXME: Перенести в thunk? Надо подумать.
  // Обрабатываем авторизацию
  const handleLogin = (loginData: TCredintials) => {
    // Авторизуемся
    Auth.signIn(loginData)
      .then((response) => {
        setSignInState({ error: '' });

        if (response.ok && response.status === 200) {
          dispatch(logIn());
          return;
        }

        if (response.status === 400) {
          // FIXME: если юзер авторизован, он не должен попадать на эту страницу
          Auth.logOut();
          setSignInState({ error: 'Юзер уже авторизован' });
          throw new Error('Юзер уже авторизован');
        }

        if (response.status === 401) {
          setSignInState({ error: 'Неверные имя пользователя или пароль' });
          throw new Error('Неверные имя пользователя или пароль');
        }
      })
      .then(() => Auth.getUserData()
        .then((response) => {
          if (response.ok && response.status === 200) {
            return response.json();
          }

          setSignInState({ error: 'Ошибка при получении данных пользователя' });
        })
        .then((userData) => {
          localStorage.setItem('settings', JSON.stringify(userData));

          dispatch(setUserSettings(userData));
        }))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{
          mt: 6,
          textAlign: 'center',
          gap: 2,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
        }}
        >
          <Typography variant='h4' gutterBottom component='h1'>
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

          {signInState.error && <Alert severity='warning'>{signInState.error}</Alert>}

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Войти
          </Button>

          <Link component={RouterLink} sx={{ fontFamily: 'Roboto' }} to='/signup'>
            Нет аккаунта? Зарегистрируйтесь!
          </Link>
        </Stack>
      </form>
    </div>
  );
};

export default SignIn;
