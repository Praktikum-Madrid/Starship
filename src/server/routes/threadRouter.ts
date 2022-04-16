import { Router } from 'express';
import * as config from 'config/api';
import { handleGetThreads, handleCreateThread, handleGetThreadById } from 'server/controllers/thread';
const threadRouter = Router();

threadRouter.get(config.getThreads, handleGetThreads);
threadRouter.get(config.getThreadById, handleGetThreadById);
threadRouter.post(config.createThread, handleCreateThread);

export default threadRouter;
