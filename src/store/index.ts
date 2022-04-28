import { TStore } from 'types';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line import/prefer-default-export
export const configureStore = (initialState: TStore = {}) => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
      ),
    ),
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
