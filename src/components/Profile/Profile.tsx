// В файле были ошибки по типизации, Евгения, обрати внимание плиз на изменения, которые я внёс
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { loginValidator, nameValidator, passwordValidator, phoneValidator } from 'config/validators';
import ProfileApi from 'api/Profile';
import { TUserInfo, TPassword } from 'types';
import { useFormik } from 'formik';
import { Alert, Avatar, Button, Stack, TextField, Typography, Container } from '@mui/material';
import { setUserSettings } from 'store/reducers/settings';
import { RootState } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { RESOURCES_URL } from 'config/api';

const validationSchemaProfileData = yup.object({
  first_name: yup.string()
    .matches(nameValidator, 'Разрешены буквы, подчеркивания и дефисы')
    .min(2, 'Минимальная длина - 2 буквы')
    .required('Укажите ваше имя'),
  second_name: yup.string()
    .matches(nameValidator, 'Разрешены буквы, подчеркивания и дефисы')
    .min(2, 'Минимальная длина - 2 буквы')
    .required('Укажите вашу фамилию'),
  login: yup.string()
    .matches(loginValidator, 'Разрешены латинские буквы, цифры, подчеркивания и дефисы')
    .required('Укажите логин пользователя'),
  display_name: yup.string()
    .matches(loginValidator, 'Разрешены латинские буквы, цифры, подчеркивания и дефисы')
    .required('Укажите имя пользователя'),
  email: yup.string()
    .email('Укажите корректный адрес электронной почты')
    .required('Укажите адрес электронной почты'),
  phone: yup.string()
    .matches(phoneValidator, 'Должно состоять только из цифр, может начинаться со знака +, от 10 до 15 символов')
    .required('Укажите номер телефона'),
});

const validationSchemaPassword = yup.object({
  oldPassword: yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .matches(passwordValidator, 'Должны использоваться как цифры, так и буквы')
    .required('Пожалуйста, введите пароль'),
  newPassword: yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .matches(passwordValidator, 'Должны использоваться как цифры, так и буквы')
    .required('Пожалуйста, введите пароль'),
});

const Profile = () => {
  const [errorRequest, setError] = useState('');
  const userSettings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const saveProfile = (data: TUserInfo) => {
    ProfileApi.saveProfile(data)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        setError('Ошибка при обновлении данных пользователя');
      })
      .then((userData) => {
        localStorage.setItem('settings', JSON.stringify(userData));
        dispatch(setUserSettings(userData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const savePassword = (data: TPassword) => {
    ProfileApi.savePassword(data)
      .then((response) => {
        if (!(response.status === 200)) {
          setError('Ошибка при обновлении пароля пользователя');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveAvatar = (file: File) => {
    const form = new FormData();
    form.append('avatar', file);
    ProfileApi.saveAvatar(form)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        setError('Ошибка при обновлении аватара');
      })
      .then((userData) => {
        localStorage.setItem('settings', JSON.stringify(userData));
        dispatch(setUserSettings(userData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(userSettings);
  }, []);

  useEffect(() => {
    formProfile.resetForm({ values: userSettings as any });
  }, [userSettings]);

  const formProfile = useFormik({
    initialValues: userSettings as any,
    validationSchema: validationSchemaProfileData,
    onSubmit: (values: TUserInfo) => {
      setFormProfileEnable(false);
      saveProfile(values);
    },
  });

  const formPassword = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchemaPassword,
    onSubmit: (values: TPassword) => {
      setFormPasswordEnable(false);
      savePassword(values);
    },
  });

  const closeFormProfile = () => {
    formProfile.resetForm({ values: userSettings as any });
    setFormProfileEnable(false);
  };

  const closeFormPassword = () => {
    formPassword.resetForm();
    setFormPasswordEnable(false);
  };

  const [formProfileEnabled, setFormProfileEnable] = useState(false);
  const [formPasswordEnabled, setFormPasswordEnable] = useState(false);

  useEffect(() => {
    if (formPasswordEnabled || formProfileEnabled) {
      setError('');
    }
  }, [formPasswordEnabled, formProfileEnabled]);

  return (
    <Container
      sx={{
        width: '100%',
        height: 'calc(100vh - 88px)',
      }}
    >
      <Stack sx={{
        pt: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '400px',
      }}
      >
        <Avatar
          alt={userSettings?.login}
          src={userSettings?.avatar ? `${RESOURCES_URL}${userSettings.avatar}` : '../images/avatar.png'}
          sx={{
            width: 100,
            height: 100,
          }}
        />
        <input
          accept='image/*'
          style={{
            cursor: 'pointer',
            opacity: 0,
            position: 'absolute',
            width: '100px',
            height: '100px' }}
          id='button-file'
          type='file'
          onClick={() => setError('')}
          onChange={(e) => {
            const files = e.target?.files;
            if (files?.length) {
              saveAvatar(files[0]);
            }
          }}
        />
      </Stack>

      {errorRequest && (
        <Stack sx={{
          mt: 2,
          textAlign: 'center',
          gap: 2,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
        }}
        >
          <Alert severity='warning'>{errorRequest}</Alert>
        </Stack>
      )}

      <form onSubmit={formProfile.handleSubmit}>
        <Stack sx={{
          mt: 2,
          textAlign: 'center',
          gap: 2,
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
        }}
        >
          <Typography variant='h4' gutterBottom component='h1' sx={{ color: 'text.primary' }}>
            {userSettings?.login}
          </Typography>
          <>
            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='first_name'
              name='first_name'
              label='Имя'
              variant='standard'
              value={formProfile.values.first_name}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={
                formProfile.touched.first_name && Boolean(formProfile.errors.first_name)
              }
              helperText={formProfile.touched.first_name && formProfile.errors.first_name}
            />

            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='second_name'
              name='second_name'
              label='Фамилия'
              variant='standard'
              value={formProfile.values.second_name}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={
                formProfile.touched.second_name && Boolean(formProfile.errors.second_name)
              }
              helperText={formProfile.touched.second_name && formProfile.errors.second_name}
            />

            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='email'
              name='email'
              label='Адрес E-mail'
              variant='standard'
              value={formProfile.values.email}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={formProfile.touched.email && Boolean(formProfile.errors.email)}
              helperText={formProfile.touched.email && formProfile.errors.email}
            />

            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='phone'
              name='phone'
              label='Номер телефона'
              variant='standard'
              value={formProfile.values.phone}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={formProfile.touched.phone && Boolean(formProfile.errors.phone)}
              helperText={formProfile.touched.phone && formProfile.errors.phone}
            />

            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='login'
              name='login'
              label='Имя пользователя (Логин)'
              variant='standard'
              value={formProfile.values.login}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={formProfile.touched.login && Boolean(formProfile.errors.login)}
              helperText={formProfile.touched.login && formProfile.errors.login}
            />

            <TextField
              fullWidth
              disabled={!formProfileEnabled}
              id='display_name'
              name='display_name'
              label='Дисплейное имя'
              variant='standard'
              value={formProfile.values.display_name}
              onChange={formProfile.handleChange}
              onBlur={formProfile.handleBlur}
              error={formProfile.touched.display_name && Boolean(formProfile.errors.display_name)}
              helperText={formProfile.touched.display_name && formProfile.errors.display_name}
            />

            {formProfileEnabled ? (
              <>
                <Button color='primary' variant='contained' fullWidth type='submit'>
                  Сохранить изменения
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  type='submit'
                  onClick={closeFormProfile}
                >
                  Отменить
                </Button>
              </>
            ) : (
              <Button
                color='primary'
                variant='contained'
                type='button'
                onClick={() => setFormProfileEnable(true)}
              >
                Изменить данные
              </Button>
            )}

          </>
        </Stack>
      </form>

      <Stack sx={{
        mt: 3,
        pb: 3,
        textAlign: 'center',
        gap: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '400px',
      }}
      >
        {formPasswordEnabled ? (
          <form onSubmit={formPassword.handleSubmit}>
            <TextField
              fullWidth
              id='newPassword'
              name='newPassword'
              label='Новый пароль'
              type='password'
              variant='standard'
              value={formPassword.values.newPassword}
              onChange={formPassword.handleChange}
              onBlur={formPassword.handleBlur}
              error={formPassword.touched.newPassword && Boolean(formPassword.errors.newPassword)}
              helperText={formPassword.touched.newPassword && formPassword.errors.newPassword}
            />
            <TextField
              fullWidth
              id='oldPassword'
              name='oldPassword'
              label='Старый пароль'
              type='password'
              variant='standard'
              value={formPassword.values.oldPassword}
              onChange={formPassword.handleChange}
              onBlur={formPassword.handleBlur}
              error={formPassword.touched.oldPassword && Boolean(formPassword.errors.oldPassword)}
              helperText={formPassword.touched.oldPassword && formPassword.errors.oldPassword}
            />
            <Stack sx={{
              mt: 3,
              mb: 3,
              textAlign: 'center',
              gap: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '400px',
            }}
            >
              <Button color='primary' variant='contained' type='submit'>
                Сохранить пароль
              </Button>
              <Button color='secondary' variant='contained' type='submit' onClick={closeFormPassword}>
                Отменить
              </Button>
            </Stack>
          </form>
        ) : (
          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='button'
            onClick={() => setFormPasswordEnable(true)}
          >
            Изменить пароль
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
