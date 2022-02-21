import React, { useRef, useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import StarshipGame from 'game/game';
import { Button, IconButton } from '@mui/material';
import EndGameScene from 'components/Game/components';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);


  const [endGame, setEndGame] = useState(false);
  const [start, setStart] = useState(false);


  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    ref.current?.focus();

    if (start && ctx) {
      const game = new StarshipGame(ctx, 900, 700);
      game.start();
    }
  }, [start]);

  // TODO пока так для наглядности, но потом нужно чтобы счет откуда-то приходил
  const score = 666;

  return (

    <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
      {!endGame && (
        <IconButton
          aria-label='quit'
          sx={{ position: 'absolute', right: '0px' }}
          onClick={() => {
          // TODO останавливаем игру
            setEndGame(true);
          }}
        >
          <img alt='quit-button' src='../images/buttons/quit.png' width='130px' />
        </IconButton>
      )}

      <Button
        onClick={() => setStart(true)}
        sx={{ display: `${start ? 'none' : 'block'}` }}
        color='primary'
        variant='text'
        fullWidth
        type='button'
      >
        Start!
      </Button>

      <canvas ref={ref} width={900} height={700} />
      {endGame && (
        <EndGameScene
          score={score}
          handleReplay={() => {
            setEndGame(false);
            // TODO делаем еще что-то для начала игры, setStart например, очищаем счет
          }}
        />
      )}
    </Container>
  );
}
