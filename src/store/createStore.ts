// import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export default (req: any) => {
  // const axiosInstance = axios.create({
  //   baseURL: 'https://ya-praktikum.tech/api/v2',
  //   headers: { cookie: req.get('cookie') || '' },
  // });

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk),
  );

  return store;
};
