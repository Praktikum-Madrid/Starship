import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

const Home = () => {
  const navigate = useNavigate();

  const { isLogined } = useSelector((state: RootState) => state.auth);
  const { city } = useSelector((state: RootState) => state.mode);

  return (
    <Container
      sx={{
        // bgcolor: 'background.default',
        width: '100%',
        height: 'calc(100vh - 88px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* <Box
        component='img'
        sx={{
          width: '100%',
          maxHeight: 'calc(100vh - 64px)',
        }}
        src='../images/background.png'
      /> */}
      {/* <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      > */}
      <div style={{ textAlign: 'center', maxWidth: '460px', zIndex: '5' }}>
        <Box
          component='img'
          sx={{
            width: '150px',
            height: '150px',
            marginTop: '150px',
          }}
          src='/images/spaceship.png'
        />
        <Typography
          variant='h3'
          component='h1'
          color='primary'
          sx={{
            fontWeight: '900',
            marginTop: '10px',
          }}
        >
          STARSHIP
        </Typography>
        <Typography
          variant='h6'
          component='h6'
          align='center'
          sx={{
            fontWeight: '700',
            marginTop: '20px',
            color: 'text.primary',
          }}
        >
          Привет
          {`${city !== '' ? `, ${city}! ` : '! '}`}
          STARSHIP - это игра, где тебе нужно обстреливать врагов
          и&nbsp;уворачиваться, чтобы сохранить свой корабль.
        </Typography>

        <Button
          sx={{
            width: '200px',
            height: '80px',
            marginTop: '50px',
          }}
          color='primary'
          variant='contained'
          onClick={() => {
            navigate(isLogined ? '/game' : '/signin');
          }}
        >
          К ИГРЕ
        </Button>
      </div>
      {/* <div
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: '10px',
          opacity: '50%',
          width: '100%',
          height: '100%',
          padding: '30px',
        }}
      /> */}
      {/* </div> */}
    </Container>
  );
};

export default Home;
