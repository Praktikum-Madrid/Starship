import React, { useRef, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { IconButton } from '@mui/material';
import StarshipGame from './components/StarshipGame';
import StartGameScene from '../StartGameScene';
import EndGameScene from '../EndGameScene';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [isGame, setIsGame] = useState(false);
  const [isQuit, setIsQuit] = useState(false);
  const score = 1000;

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    ref.current?.focus();

    if (isGame && ctx) {
      const game = new StarshipGame(ctx);
      game.start();
    }
  }, [isGame]);

  return (
    <Container
      sx={{
        width: '900px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      {isGame ? (
        <>
          <IconButton
            aria-label='quit'
            sx={{ position: 'absolute', right: '0px' }}
            onClick={() => {
              setIsGame(false);
              setIsQuit(true);
            }}
          >
            <img
              alt='quit-button'
              src='../images/buttons/quit.png'
              width='130px'
            />
          </IconButton>
          <canvas ref={ref} width={900} height={700} />
        </>
      ) : (
        <>
          {!isQuit && (
            <StartGameScene
              score={score}
              handlePlay={() => {
                setIsGame(true);
              }}
            />
          )}
          {isQuit && (
            <EndGameScene
              score={score}
              handleReplay={() => {
                setIsGame(true);
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
