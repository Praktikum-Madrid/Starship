import React, { useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import StarshipGame from './utils/starshipGame';

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (ctx) {
      const game = new StarshipGame(ctx);
      game.start();
    }
  }, []);
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <canvas ref={ref} width={900} height={700} />
    </Container>
  );
}
