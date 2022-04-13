import { Router } from 'express';
import { handleGetCommentsByParentIdMessage, handleGetMessagesByThread, handleCreateMessage, handleCreateCommentToMessage } from '../controllers/message';
const messageRouter = Router();

// Работа с сообщениями и комментами
export const getMessagesByThread = '/message/:threadId';
export const createMessage = '/message';
export const createMessageToMessage = '/comment';
export const getMessagesByParentIdMessage = '/comment/:replyToMessageId';

messageRouter.get(getMessagesByThread, handleGetMessagesByThread);
messageRouter.get(getMessagesByParentIdMessage, handleGetCommentsByParentIdMessage);
messageRouter.post(createMessageToMessage, handleCreateCommentToMessage);
messageRouter.post(createMessage, handleCreateMessage);

export default messageRouter;
