/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { auth } from 'api/frontend';
import { Dispatch } from 'redux';
import { TCredintials } from 'types';
import { deleteUserSettings, setUserSettings } from 'store/actions/settings';
import { getUser, redirectURL } from 'config/api';
import { AxiosResponse } from 'axios';
import { getUserById } from 'server/database/controllers/user';

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  GET_USER: 'GET_USER',
  SET_MODE: 'SET_MODE',
};

// Проверка авторизации и загрузка данных юзера
export const isAuth = () => async (dispatch: any, getState: any, axiosInstance: any) => {
  try {
    const res = await axiosInstance.get(
      getUser,
      {},
      {
        withCredentials: true,
      },
    );
    console.log(res.data.id); // получили id юзера
    const theme = await getUserById(`${res.data.id}`);
    console.log(theme.data.mode); // получили сохраненную тему
    // Если авторизация успешна
    if (res.status === 200) {
      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          isLogined: true,
          error: '',
        },
      });
      dispatch({
        type: ACTIONS.GET_USER,
        payload: res.data,
      });
      dispatch({
        type: ACTIONS.SET_MODE,
        payload: { mode: theme.data.mode },
      });
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

// Асинхронная авторизация
export function logIn(loginData: TCredintials) {
  return async (dispatch: Dispatch) => {
    try {
      await auth
        .signIn(loginData)
        .then((response: AxiosResponse) => {
          // Если авторизация успешна
          if (response.status === 200) {
            dispatch({
              type: ACTIONS.LOGIN,
              payload: {
                isLogined: true,
                error: '',
              },
            });
            return;
          }

          if (response.status === 400) {
            dispatch(logOut() as any);
            throw new Error(
              'Юзер уже авторизован, и не должен попадать на эту страницу',
            );
          }

          if (response.status === 401) {
            dispatch({
              type: ACTIONS.LOGIN,
              payload: {
                isLogined: false,
                error: 'Неверные имя пользователя или пароль',
              },
            });
            throw new Error('Неверные имя пользователя или пароль');
          }
        })
        .then(() => auth
          .getUserData()
          .then(async (response: AxiosResponse) => {
            if (response.status === 200) {
              const theme = await getUserById(`${response.data.id}`);
              console.log(theme.data.mode); // получили сохраненную тему
              dispatch({
                type: ACTIONS.SET_MODE,
                payload: { mode: theme.data.mode },
              });
              return response.data;
            }

            throw new Error('Ошибка при получении данных пользователя');
          })
          .then((userData: AxiosResponse) => {
            dispatch(setUserSettings(userData));
          }));
    } catch (error) {
      console.log(error);
    }
  };
}

// проверка авторизован пользователь с помощью OAuthYandex или нет
export function checkOAuthYandex() {
  return async (dispatch: Dispatch) => {
    try {
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code');

      if (code) {
        await auth
          .oauthYandex({
            code,
            redirect_uri: `${redirectURL}`,
          })
          .then((response: AxiosResponse) => {
            // Если юзер авторизован
            if (response.status === 200) {
              dispatch({
                type: ACTIONS.LOGIN,
                payload: {
                  isLogined: true,
                  error: '',
                },
              });
              return Promise.resolve();
            }
          })
          .then(() => auth
            .getUserData()
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                return response.data;
              }

              throw new Error('Ошибка при получении данных пользователя');
            })
            .then((userData) => {
              dispatch(setUserSettings(userData));
            }))
          .catch((error) => {
            console.log(error);
            throw new Error(
              'Ошибка при попытке проверить, авторизован ли пользователь с помощью Яндекса',
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// Асинхронная oauth авторизация
export async function oauthYandexLogIn() {
  await auth
    .getServiceIdYandex()
    .then((response: AxiosResponse) => {
      // Если успешно получили serviceId
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ service_id }) => {
      // редирект в яндекс
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirectURL}`;
    })
    .catch((error: any) => {
      console.log(error);
      throw new Error('Ошибка при попытке авторизоваться с помощью Яндекса');
    });
}

// Асинхронный выход
export function logOut() {
  return async (dispatch: Dispatch) => {
    // Выполяем логаут
    try {
      await auth.logOut();
      dispatch(deleteUserSettings());
      // Обновляем стейт
      dispatch({
        type: ACTIONS.LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Асинхронная регистрация
export function registerUser(userData: TCredintials) {
  return async (dispatch: Dispatch) => {
    try {
      await auth
        .signUp(userData)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            // Успешная регистрация
            dispatch({
              type: ACTIONS.REGISTER,
              isRegistered: true,
              signUpError: '',
            });
          }

          if (response.status === 400) {
            // FIXME: Авторизованый юзер не должен попадать в этот роут
            dispatch(logOut() as any);
            // Успешная регистрация
            dispatch({
              type: ACTIONS.REGISTER,
              isRegistered: false,
              signUpError: 'Ошибка при создании пользователя (уже авторизован)',
            });
          }

          if (response.status === 409) {
            dispatch({
              type: ACTIONS.REGISTER,
              isRegistered: false,
              signUpError: 'Пользователь с таким имейлом уже существует',
            });
          }

          return response.data;
        })
        .then((parsedResponse: any) => {
          console.log(parsedResponse);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
