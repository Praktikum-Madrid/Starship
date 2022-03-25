import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { logOut } from 'store/reducers/auth';
import { RootState } from 'store/reducers';
import { RESOURCES_URL } from 'config/api';

const pages = [
  { page: 'Главная', link: '/' },
  { page: 'Играть', link: '/game' },
  { page: 'Таблица лидеров', link: '/leaderboard' },
  { page: 'Форум', link: '/forum' },
  { page: 'Профиль', link: '/profile' },
];
const settings = [
  { page: 'Регистрация', link: '/signup' },
  { page: 'Войти', link: '/signin' },
  { page: 'Выйти', link: '/', signout: true },
];

const HeaderWithMenu = () => {
  const dispatch = useDispatch();
  const { isLogined } = useSelector((state: RootState) => state.auth);
  const { login, avatar } = useSelector((state: RootState) => state.settings);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logOut());
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            STARSHIP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ page, link }) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={link}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            STARSHIP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ page, link }) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={link}
                sx={{ my: 2, color: 'white', display: isLogined ? 'block' : 'none' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={login} src={avatar ? `${RESOURCES_URL}${avatar}` : '../images/avatar.png'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ page, link, signout }) => (signout ? (
                <MenuItem
                  key={page}
                  onClick={handleLogout}
                  component={Link}
                  to={link}
                  sx={{
                    display: isLogined ? 'flex' : 'none',
                  }}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  key={page}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={link}
                  sx={{
                    display: !isLogined ? 'flex' : 'none',
                  }}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              )))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderWithMenu;
