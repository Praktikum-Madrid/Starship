import React, { FC } from 'react';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const styles = {
  buttonsGame: {
    width: '230px',
    color: 'white',
    border: '5px #406325 solid',
    borderRadius: '15px',
    marginBottom: '15px',
  },
};

interface IProps {
  score: number;
  handlePlay: () => void;
}

const StartGameScene: FC<IProps> = ({ score, handlePlay }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100px',
        padding: '30px',
        background: 'background.default', // '#0b72b9'
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '15px',
      }}
    >
      <div>
        <img alt='gameOver' src='../images/texts/go.png' width='300px' />
      </div>
      <Button
        sx={styles.buttonsGame}
        color='success'
        variant='contained'
        onClick={handlePlay}
      >
        ИГРАТЬ
      </Button>
      <Button
        sx={styles.buttonsGame}
        color='success'
        variant='contained'
        onClick={() => {
          navigate('/leaderboard');
        }}
      >
        ОЧКИ
      </Button>
    </Paper>
  );
};

export default StartGameScene;
