import { Router } from 'express';
import { handleGetCommentsByParentIdMessage, handleGetMessagesByThread, handleCreateMessage, handleCreateCommentToMessage } from '../controllers/message';
const messageRouter = Router();

// Работа с сообщениями и комментами
export const getMessagesByThread = '/api/message/:threadId';
export const createMessage = '/api/message';
export const createMessageToMessage = '/api/comment';
export const getMessagesByParentIdMessage = '/api/comment/:replyToMessageId';

messageRouter.get(getMessagesByThread, handleGetMessagesByThread);
messageRouter.get(getMessagesByParentIdMessage, handleGetCommentsByParentIdMessage);
messageRouter.post(createMessageToMessage, handleCreateCommentToMessage);
messageRouter.post(createMessage, handleCreateMessage);

export default messageRouter;
