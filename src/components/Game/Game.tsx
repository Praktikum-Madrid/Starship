import React, { useRef, useEffect } from 'react';
import StarshipGame from './utils/game';

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
    <>
      <div>Страница с игрой</div>
      <canvas ref={ref} width={640} height={360} />
    </>
  );
}
