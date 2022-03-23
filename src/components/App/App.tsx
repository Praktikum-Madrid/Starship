import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'config/Theme';
import routes from '../../Routes';
import Layout from '../Layout';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          {routes.map(({ path, element: Component }) => (
            // @ts-ignore
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
