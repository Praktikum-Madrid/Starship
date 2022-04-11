import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RootState } from 'store/reducers';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import Layout from '../Layout';

export default function App() {
  const { mode } = useSelector((state: RootState) => state.mode);
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
        <Route path='/' element={Layout.element()}>
          {routes.map(({ path, element: Component }) => (
            // @ts-ignore
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
