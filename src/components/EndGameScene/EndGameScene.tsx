/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'config/consts';

const styles = {
  buttonsEndGame: {
    width: '230px',
    color: 'white',
    border: '5px #406325 solid',
    borderRadius: '15px',
    marginBottom: '15px',
  },
};

const getScoreImage = (score: number) => {
  const digits = score.toFixed().split('');
  return (
    <div style={{ display: 'flex' }}>
      {digits.map((dig) => (
        <div key={Number(new Date()) * Math.random()}>
          <img
            alt='score-digit'
            src={`/images/digits/${dig}.png`}
            height='30px'
          />
        </div>
      ))}
    </div>
  );
};

interface IProps {
  score: number;
  handleReplay: () => void;
}

const EndGameScene: FC<IProps> = ({ score, handleReplay }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100px',
        padding: '30px',
        background: '#0b72b9',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '15px',
      }}
    >
      <div>
        <img alt='gameOver' src='/images/texts/gameOver.png' width='300px' />
      </div>
      <div
        style={{
          display: 'flex',
          marginBottom: '15px',
        }}
      >
        <img
          alt='score'
          src='/images/texts/score.png'
          width='130px'
          height='34px'
        />
        {getScoreImage(score)}
      </div>
      <Button
        sx={styles.buttonsEndGame}
        color='success'
        variant='contained'
        onClick={handleReplay}
      >
        ИГРАТЬ ЕЩЁ
      </Button>
      <Button
        sx={styles.buttonsEndGame}
        color='success'
        variant='contained'
        onClick={() => {
          navigate(PATH.LEADERBOARD);
        }}
      >
        ОЧКИ
      </Button>
    </Paper>
  );
};

export default EndGameScene;
