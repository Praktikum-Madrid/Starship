// import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

// TODO: Сюда мы передаем первоначальное состояние стора, например, авторизован ли юзер, да и в целом можем
//  сюда передать всё, что пожелаем. В таком случае нам не надо будет диспатчить экшены на бекенде (зачем),
//  мы просто вытягиваем данные из бд/апи прямыми запросами. Расписал в коспоненте Leaderboard
export default (initialState = {}) => {
  // const axiosInstance = axios.create({
  //   baseURL: 'https://ya-praktikum.tech/api/v2',
  //   headers: { cookie: req.get('cookie') || '' },
  // });

  const store = createStore(
    rootReducer,
    initialState, // Начальный стейт приложения
    applyMiddleware(thunk),
  );

  return store;
};
