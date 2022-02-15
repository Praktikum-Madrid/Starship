import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import './SignUp.css';
import { TCredintials } from 'types';
import { loginValidator, nameValidator, passwordValidator, phoneValidator } from 'config/validators';

const validationSchema = yup.object({
  first_name: yup.string()
    .matches(nameValidator, 'Разрешены буквы, подчеркивания и дефисы')
    .min(2, 'Минимальная длина - 2 буквы')
    .required('Укажите ваше имя'),
  second_name: yup.string()
    .matches(nameValidator, 'Разрешены буквы, подчеркивания и дефисы')
    .min(2, 'Минимальная длина - 2 буквы')
    .required('Укажите вашу фамилию'),
  login: yup.string()
    .matches(loginValidator, 'Разрешены буквы, цифры, подчеркивания и дефисы')
    .required('Укажите имя пользователя'),
  email: yup.string()
    .email('Укажите корректный адрес электронной почты')
    .required('Укажите адрес электронной почты'),
  password: yup
    .string()
    .matches(passwordValidator, 'Разрешены буквы, цифры, и спецсимволы')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пожалуйста, введите пароль'),
  phone: yup.string()
    .matches(phoneValidator, 'Может состоянть только из чисел')
    .required('Укажите номер телефона'),
});

interface IProps {
  handleSignUp: Function,
  signUpState: Record<string, boolean>
}

const SignUp: FC<IProps> = ({ handleSignUp, signUpState }) => {
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
    onSubmit: (values: TCredintials) => {
      handleSignUp(values);
    },
  });

  return (
    <>
      <form className='signup' onSubmit={formik.handleSubmit}>
        <Stack sx={{ mt: 2, textAlign: 'center', gap: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Регистрация
          </Typography>
          {!signUpState.registered
            && <>
              <TextField
                fullWidth
                id='first_name'
                name='first_name'
                label='Имя'
                variant='standard'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={formik.touched.first_name && formik.errors.first_name}
              />

              <TextField
                fullWidth
                id='second_name'
                name='second_name'
                label='Фамилия'
                variant='standard'
                value={formik.values.second_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.second_name && Boolean(formik.errors.second_name)
                }
                helperText={formik.touched.second_name && formik.errors.second_name}
              />

              <TextField
                fullWidth
                id='email'
                name='email'
                label='Адрес E-mail'
                variant='standard'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                id='phone'
                name='phone'
                label='Номер телефона'
                variant='standard'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                fullWidth
                id='login'
                name='login'
                label='Имя пользователя (Логин)'
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

              <Button color='primary' variant='contained' fullWidth type='submit'>
                Зарегистрироваться
              </Button>
            </>
          }

          {signUpState.registered && <Alert severity="success">Регистрация прошла успешно! Теперь вы можете войти.</Alert>}
          {signUpState.error && <Alert severity="warning">{signUpState.error}</Alert>}

          <Link component={RouterLink} sx={{ fontFamily: 'Roboto' }} to="/signin" >
            Уже зарегистрированы? Войти.
          </Link>
        </Stack>
      </form>
    </>
  );
};
export default SignUp;
