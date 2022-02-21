import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import StarshipGame from 'game/game';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    ref.current?.focus();

    if (start && ctx) {
      const game = new StarshipGame(ctx, 900, 700);
      game.start();
    }
  }, [start]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
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
    </Container>
  );
}
