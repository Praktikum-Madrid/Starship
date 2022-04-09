import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App/App';
import 'normalize.css';
import './index.css';

import { Provider } from 'react-redux';
import { configureStore } from 'store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// function startServiceWorker() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/ServiceWorker.js').then((registration) => {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }).catch((error: string) => {
//         console.log('ServiceWorker registration failed: ', error);
//       });
//     });
//   }
// }

// startServiceWorker();
