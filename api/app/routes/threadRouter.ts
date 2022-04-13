import { handleGetThreads, handleGetThreadById, handleCreateThread } from 'app/controllers/thread';
import { Router } from 'express';
const threadRouter = Router();

// Работа с темами
export const getThreads = '/thread/all';
export const getThreadById = '/thread/:id';
export const createThread = '/thread';

threadRouter.get(getThreads, handleGetThreads);
threadRouter.get(getThreadById, handleGetThreadById);
threadRouter.post(createThread, handleCreateThread);

export default threadRouter;
