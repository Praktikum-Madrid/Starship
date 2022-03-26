import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import theme from 'config/Theme';
import routes from '../../Routes';
import Layout from '../Layout';

export default function App() {
  // TODO: хранить состояние в redux
  const mode = 'dark';
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode,
      },
    }),
    [mode],
  );
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
