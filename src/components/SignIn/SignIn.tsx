import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { TCredintials } from 'types';
import { logIn, oauthYandexLogIn } from 'store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { PATH } from 'config/consts';

const validationSchema = yup.object({
  login: yup.string()
    .required('Пожалуйста, введите имя пользователя'),
  password: yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пожалуйста, введите пароль'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { isLogined, signInError } = useSelector((state: RootState) => state.auth);
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

  useEffect(() => {
    if (isLogined) {
      navigate(PATH.GAME);
    }
  }, [isLogined]);

  // Обрабатываем авторизацию
  const handleLogin = (loginData: TCredintials) => {
    dispatch(logIn(loginData));
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

          {signInError && <Alert severity='warning'>{signInError}</Alert>}

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Войти
          </Button>

          <Button
            onClick={oauthYandexLogIn}
          >
            Войти с помощью Яндекс ID
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
