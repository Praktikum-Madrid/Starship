import { Router } from 'express';
import { handleGetThreads, handleGetThreadById, handleCreateThread, handleGetEmotions } from '../controllers/thread';
const threadRouter = Router();

// Работа с темами
export const getThreads = '/api/thread/all';
export const getThreadById = '/api/thread/:id';
export const createThread = '/api/thread';
export const getEmotions = '/api/emotion/all';

threadRouter.get(getThreads, handleGetThreads);
threadRouter.get(getThreadById, handleGetThreadById);
threadRouter.get(getEmotions, handleGetEmotions);
threadRouter.post(createThread, handleCreateThread);

export default threadRouter;
