import { TStore } from 'types';
import { createStore } from 'redux';
import { rootReducer } from 'store/reducers';

// eslint-disable-next-line import/prefer-default-export
export const configureStore = (initialState: TStore = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
  );

  return store;
};
