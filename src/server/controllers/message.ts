/* eslint-disable camelcase */
import { TReq, TRes } from 'types';
import { handleErrorReq } from 'server/utils';
import {
  createMessage,
  createMessageToMessage,
  getMessages,
  getMessagesToMessage,
} from 'server/database/controllers/message';

export const handleGetMessagesByThread = (req: TReq, res: TRes) => {
  const { threadId } = req.params;
  const parsedThreadId = Number(threadId);
  if (Number.isNaN(parsedThreadId)) {
    res.status(404).send();
  }
  getMessages(parsedThreadId)
    .then((messages) => {
      res.status(messages.status)
        .send(messages.data);
    })
    .catch(handleErrorReq(res));
};

export const handleGetCommentsByParentIdMessage = (req: TReq, res: TRes) => {
  const { replyToMessageId } = req.params;
  const parsedReplyToMessageId = Number(replyToMessageId);
  if (Number.isNaN(parsedReplyToMessageId)) {
    res.status(404).send();
  }
  getMessagesToMessage(parsedReplyToMessageId)
    .then((messages) => {
      res.status(messages.status)
        .send(messages.data);
    })
    .catch(handleErrorReq(res));
};

export const handleCreateMessage = (req: TReq, res: TRes) => {
  const {
    text, threadId, emotionId, authorId,
  } = req.body;
  createMessage({
    text,
    authorId,
    threadId,
    emotionId,
  })
    .then((newMsg) => {
      res.status(newMsg.status)
        .send(newMsg.data);
    })
    .catch(handleErrorReq(res));
};

export const handleCreateCommentToMessage = (req: TReq, res: TRes) => {
  const {
    text, threadId, emotionId, replyToMessageId, authorId,
  } = req.body;
  createMessageToMessage({
    text,
    authorId,
    threadId,
    emotionId,
    replyToMessageId,
  })
    .then((newMsg) => {
      res.status(newMsg.status)
        .send(newMsg.data);
    })
    .catch(handleErrorReq(res));
};
