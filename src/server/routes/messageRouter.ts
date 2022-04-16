import { Router } from 'express';
import * as config from 'config/api';
import { handleGetCommentsByParentIdMessage, handleGetMessagesByThread, handleCreateCommentToMessage, handleCreateMessage } from 'server/controllers/message';
const messageRouter = Router();

messageRouter.get(config.getMessagesByThread, handleGetMessagesByThread);
messageRouter.get(config.getMessagesByParentIdMessage, handleGetCommentsByParentIdMessage);
messageRouter.post(config.createMessageToMessage, handleCreateCommentToMessage);
messageRouter.post(config.createMessage, handleCreateMessage);

export default messageRouter;
