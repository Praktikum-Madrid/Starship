import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Tab, Tabs, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { logOut } from 'store/reducers/auth';
import Auth from 'api/Auth';

const Header = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const { isLogined } = useSelector((state: RootState) => state.auth);
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
    Auth.logOut()
      .then((response) => {
        localStorage.removeItem('settings');
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
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
              label='Home'
              component={Link}
              to='/'
            />
            <Tab
              sx={{
                textTransform: 'none',
                color: 'white',
              }}
              label='Game'
              component={Link}
              to='/game'
            />
            <Tab
              sx={{
                textTransform: 'none',
                color: 'white',
              }}
              label='Leaderboard'
              component={Link}
              to='/leaderboard'
            />
            <Tab
              sx={{
                textTransform: 'none',
                color: 'white',
              }}
              label='Forum'
              component={Link}
              to='/forum'
            />
            {isLogined
            && (
              <Tab
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
                label='Profile'
                component={Link}
                to='/profile'
              />
            )}
            {!isLogined
              && (
                <Tab
                  sx={{
                    textTransform: 'none',
                    color: 'white',
                  }}
                  label='SignIn'
                  component={Link}
                  to='/signin'
                />
              )}
            {!isLogined
              && (
                <Tab
                  sx={{
                    textTransform: 'none',
                    color: 'white',
                  }}
                  label='SignUp'
                  component={Link}
                  to='/signup'
                />
              )}
            {isLogined
              && (
                <Tab
                  sx={{
                    textTransform: 'none',
                    color: 'white',
                  }}
                  component={Button}
                  label='Logout'
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
