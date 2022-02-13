/* eslint-disable comma-dangle */
// Header

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Tab, Tabs } from '@mui/material';

export default function Header() {
  const [value, setValue] = React.useState(0);

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
  }, [value]);

  return (
    <AppBar position='static' color='primary'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            STARSHIP
          </Typography>
          <Tabs
            onChange={handleChange}
            sx={{ marginLeft: 'auto' }}
            indicatorColor='primary'
            textColor='inherit'
            value={value}>
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='Home'
              component={Link}
              to='/'
            />
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='Game'
              component={Link}
              to='/game'
            />
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='Leaderboard'
              component={Link}
              to='/leaderboard'
            />
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='Forum'
              component={Link}
              to='/forum'
            />
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='Profile'
              component={Link}
              to='/profile'
            />
            <Tab
              sx={{ textTransform: 'none', color: 'white' }}
              label='SignIn'
              component={Link}
              to='/signin'
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
