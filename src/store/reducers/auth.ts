import Auth from 'api/Auth';
import { Dispatch } from 'redux';
import { TCredintials, TPayload } from 'types';
import { deleteUserSettings, setUserSettings } from 'store/reducers/settings';
import { redirectURL } from 'config/api';

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
};

type UserState = {
  isLogined?: boolean,
  signInError?: string,
  isRegistered?: boolean,
  signUpError?: string,
}

const defaultState = {
  isLogined: false,
  signInError: '',
};

export function authReducer(state: UserState = defaultState, { type, payload }: TPayload = {}) {
  switch (type) {
    // Авторизация
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogined: payload.isLogined,
        signInError: payload.error,
      };

    // Выход
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLogined: false,
      };

    // Регистрация
    case ACTIONS.REGISTER:
      return {
        ...state,
        isRegistered: payload.isRegistered,
        signUpError: payload.error,
      };

    default: return state;
  }
}

// Асинхронная авторизация
export function logIn(loginData: TCredintials) {
  return async (dispatch: Dispatch) => {
    try {
      await Auth.signIn(loginData)
        .then((response) => {
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
            throw new Error('Юзер уже авторизован, и не должен попадать на эту страницу');
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
        .then(() => Auth.getUserData()
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }

            throw new Error('Ошибка при получении данных пользователя');
          })
          .then((userData) => {
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
        await Auth.oauthYandex({
          code,
          redirect_uri: `${redirectURL}`,
        })
          .then((response) => {
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
          .then(() => Auth.getUserData()
            .then((response) => {
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
            throw new Error('Ошибка при попытке проверить, авторизован ли пользователь с помощью Яндекса');
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// Асинхронная oauth авторизация
export async function oauthYandexLogIn() {
  await Auth.getServiceIdYandex()
    .then((response) => {
      // Если успешно получили serviceId
      if (response.status === 200) {
        return response.data;
      }
    })
    .then(({ service_id }) => {
      // редирект в яндекс
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirectURL}`;
    })
    .catch((error) => {
      console.log(error);
      throw new Error('Ошибка при попытке авторизоваться с помощью Яндекса');
    });
}

// Асинхронный выход
export function logOut() {
  return async (dispatch: Dispatch) => {
    // Выполяем логаут
    try {
      await Auth.logOut();
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
      await Auth.signUp(userData)
        .then((response) => {
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
        }).then((parsedResponse) => {
          console.log(parsedResponse);
        });
    } catch (error) {
      console.log(error);
    }
  };
}
