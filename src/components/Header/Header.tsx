import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Tab, Tabs, Button } from '@mui/material';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
// import { RootState } from 'store/reducers';
import { logOut } from 'store/reducers/auth';

const Header = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  // const { isLogined } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    }
    if (window.location.pathname === '/game' && value !== 1) {
      setValue(1);
    }
    if (window.location.pathname === '/leaderboard' && value !== 2) {
      setValue(2);
    }
    if (window.location.pathname === '/forum' && value !== 3) {
      setValue(3);
    }
    if (window.location.pathname === '/profile' && value !== 4) {
      setValue(4);
    }
    if (window.location.pathname === '/signin' && value !== 5) {
      setValue(5);
    }
  }, [value, location]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position='static' color='primary'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              mr: 2,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            STARSHIP
          </Typography>
          <Tabs
            onChange={handleChange}
            sx={{ marginLeft: 'auto' }}
            indicatorColor='primary'
            textColor='inherit'
            value={value}
          >
            <Tab
              sx={{
                textTransform: 'none',
                color: 'white',
              }}
              label='Главная'
              component={Link}
              to='/'
            />
            {true
            && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Играть'
                component={Link}
                to='/game'
              />
            )}
            {true
            && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Таблица лидеров'
                component={Link}
                to='/leaderboard'
              />
            )}
            {true && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Форум'
                component={Link}
                to='/forum'
              />
            )}
            {true && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Настройки'
                component={Link}
                to='/profile'
              />

            )}
            {true && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Войти'
                component={Link}
                to='/signin'
              />
            )}
            {true
            && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Регистрация'
                component={Link}
                to='/signup'
              />
            )}
            {true
            && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                component={Button}
                label='Выйти'
                onClick={() => handleLogout()}
              />
            )}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
