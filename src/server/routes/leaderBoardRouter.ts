import { Router } from 'express';
import { handleGetTeamLeaderboard, handleAddUserToLeaderboard } from 'server/controllers/leaderBoard';
import * as config from 'config/api';
const leaderBoardRouter = Router();

leaderBoardRouter.post(config.getTeamLeaderboard, handleGetTeamLeaderboard);
leaderBoardRouter.post(config.addToLeaderboard, handleAddUserToLeaderboard);

export default leaderBoardRouter;
