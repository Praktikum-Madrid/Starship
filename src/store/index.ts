import { TStore } from 'types';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

// eslint-disable-next-line import/prefer-default-export
export const configureStore = (initialState: TStore = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
      ),
    ),
  );

  return store;
};
