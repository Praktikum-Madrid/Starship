import threadRouter from 'server/routes/threadRouter';
import leaderBoardRouter from 'server/routes/leaderBoardRouter';
import profileRouter from 'server/routes/profileRouter';
import messageRouter from 'server/routes/messageRouter';

export default [
  leaderBoardRouter,
  profileRouter,
  threadRouter,
  messageRouter,
];
