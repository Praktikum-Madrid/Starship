import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export default (req: any) => {
  const axiosInstance = axios.create({
    baseURL: 'https://ya-praktikum.tech/api/v2',
    headers: { cookie: req.get('cookie') || '' },
  });

  let initialState = {};

  if (req && req.isLogined) {
    initialState = {
      auth:
        {
          isLogined: req.isUserLogined,
        },
    };
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
  );

  return store;
};
