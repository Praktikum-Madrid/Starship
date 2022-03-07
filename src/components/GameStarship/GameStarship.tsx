import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsGame, setIsQuit } from 'store/reducers/game';
import { RootState } from 'store/reducers';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import StarshipGame from 'game';
import StartGameScene from '../StartGameScene';
import EndGameScene from '../EndGameScene';

const styles = {
  buttonQuit: {
    width: '130px',
    color: 'white',
    border: '5px #406325 solid',
    borderRadius: '15px',
    marginBottom: '15px',
    position: 'absolute',
    right: '0',
    top: '10px',
  },
};

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);
  // TODO: переписать на отдельный кастомный хук, например useSettings
  const settings = useSelector((state: RootState) => state.settings);
  const { isGame, isQuit, score, isFullscreen } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsQuit({ isQuit: false }));
    dispatch(setIsGame({ isGame: false }));
  }, []);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    ref.current?.focus();

    if (isGame && ctx) {
      const game = new StarshipGame(ctx, settings, dispatch);
      game.start();
    }
  }, [isGame]);

  return (
    <Container
      sx={{
        width: '900px',
        height: `${isFullscreen ? '100vh' : 'calc(100vh - 64px)'}`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {isGame ? (
        <>
          <Button
            sx={styles.buttonQuit}
            color='success'
            variant='contained'
            onClick={() => {
              dispatch(setIsGame({ isGame: false }));
              dispatch(setIsQuit({ isQuit: true }));
            }}
          >
            QUIT
          </Button>
          <canvas ref={ref} width={900} height={700} />
        </>
      ) : (
        <>
          {!isQuit && (
            <StartGameScene
              score={score}
              handlePlay={() => {
                dispatch(setIsGame({ isGame: true }));
                dispatch(setIsQuit({ isQuit: false }));
              }}
            />
          )}
          {isQuit && (
            <EndGameScene
              score={score}
              handleReplay={() => {
                dispatch(setIsGame({ isGame: true }));
                dispatch(setIsQuit({ isQuit: false }));
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
