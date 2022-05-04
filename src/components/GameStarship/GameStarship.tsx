import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGameScore,
  setIsGameStarted,
  setIsGameQuited,
  toggleGameFullscreen,
} from 'store/actions/game';
import { toggleFullScreen } from 'game/utils/fullscreen';
import Leaderboard from 'api/classes/Leaderboard';
import { LEADERBOARD_REQUEST } from 'config/consts';
import { RootState } from 'store/reducers';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import StarshipGame from 'game';
import StartGameScene from '../StartGameScene';
import EndGameScene from '../EndGameScene';

const styles = {
  buttonQuit: {
    width: '80px',
    color: 'white',
    border: '5px #406325 solid',
    borderRadius: '15px',
    marginBottom: '15px',
    position: 'absolute',
    right: '0',
    top: '10px',
  },
  buttonSound: {
    width: '80px',
    color: 'white',
    border: '5px #406325 solid',
    borderRadius: '15px',
    marginBottom: '15px',
    position: 'absolute',
    right: '90px',
    top: '10px',
  },
};

// Переменная для хранения экземпляра игры
let game: StarshipGame;

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  // Состояние звука в приложении
  const [isGameSoundEnabled, setSound] = useState(true);

  // TODO: переписать на отдельный кастомный хук, например useSettings
  const settings = useSelector((state: RootState) => state.settings);
  const { isGameStarted, isGameQuited, score, isFullscreen } = useSelector(
    (state: RootState) => state.game,
  );
  const dispatch = useDispatch();

  // Коллбэк, который передается внутрь игры
  const cb = {
    toggleFullscreen: () => {
      toggleFullScreen();
      dispatch(toggleGameFullscreen());
    },
    gameEndWithWin: (score: number) => {
      dispatch(setGameScore({ score: score * 200 }));
      dispatch(setIsGameStarted({ isGameStarted: false }));
      dispatch(setIsGameQuited({ isGameQuited: true }));

      const leaderboardRequest = {
        data: {
          avatar: settings.avatar,
          rating: score * 200,
          first_name: settings.first_name,
          second_name: settings.second_name,
        },
        ratingFieldName: LEADERBOARD_REQUEST.RATING_FIELD_NAME,
        teamName: LEADERBOARD_REQUEST.TEAM_NAME,
      };

      Leaderboard.addUserToLeaderboard(leaderboardRequest)
        .then((response: Response) => {
          if (response.status === 200) {
            console.log('ok');
          }
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
    gameEndWithLose: () => {
      dispatch(setGameScore({ score: 0 }));
      dispatch(setIsGameStarted({ isGameStarted: false }));
      dispatch(setIsGameQuited({ isGameQuited: true }));
    },
  };

  function handleStartGameButtonClick() {
    dispatch(setIsGameStarted({ isGameStarted: true }));
    dispatch(setIsGameQuited({ isGameQuited: false }));
  }

  function handleQuitButtonClick() {
    game.end();
    dispatch(setIsGameStarted({ isGameStarted: false }));
    dispatch(setIsGameQuited({ isGameQuited: true }));
  }

  const toggleGameSound = () => {
    ref.current?.focus();
    setSound((prevState) => !prevState);
    game?.toggleSound(isGameSoundEnabled);
  };

  useEffect(() => {
    dispatch(setIsGameStarted({ isGameStarted: false }));
    dispatch(setIsGameQuited({ isGameQuited: false }));

    // Выходим из игры если размонтируем компонент
    return function cleanUp() {
      game.end();
    };
  }, []);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');

    ref.current?.focus();

    if (isGameStarted && ctx) {
      game = new StarshipGame(ctx, settings, cb);
      game.start();
    }
  }, [isGameStarted]);

  return (
    <Container
      sx={{
        maxWidth: '900px',
        height: `${isFullscreen ? '100vh' : 'calc(100vh - 88px)'}`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {isGameStarted ? (
        <>
          <Button
            sx={styles.buttonQuit}
            color='success'
            variant='contained'
            onClick={() => handleQuitButtonClick()}
          >
            Выход
          </Button>
          <Button
            sx={styles.buttonSound}
            color={isGameSoundEnabled ? 'success' : 'error'}
            variant='contained'
            onClick={() => toggleGameSound()}
          >
            Звук
          </Button>
          <canvas ref={ref} width={900} height={700} />
        </>
      ) : (
        <>
          {!isGameQuited && (
            <StartGameScene
              score={score}
              handlePlay={() => handleStartGameButtonClick()}
            />
          )}
          {isGameQuited && (
            <EndGameScene
              score={score}
              handleReplay={() => {
                window.location.reload();
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
