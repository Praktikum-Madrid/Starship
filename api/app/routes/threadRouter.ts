import { Router } from 'express';
import { handleGetThreads, handleGetThreadById, handleCreateThread, handleGetEmotions } from '../controllers/thread';
const threadRouter = Router();

// Работа с темами
export const getThreads = '/thread/all';
export const getThreadById = '/thread/:id';
export const createThread = '/thread';
export const getEmotions = '/emotion/all';

threadRouter.get(getThreads, handleGetThreads);
threadRouter.get(getThreadById, handleGetThreadById);
threadRouter.get(getEmotions, handleGetEmotions);
threadRouter.post(createThread, handleCreateThread);

export default threadRouter;
