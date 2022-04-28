import { handleErrorReq } from '../utils';
import { TPostgresMessage, TRes, TReq } from '../config/types';
import { Message, User } from '../init';

// Создание сообщения
export async function createMessage({ text, authorId, threadId, emotionId }: TPostgresMessage) {
  return Message.create({ text, authorId, threadId, emotionId });
}

// Создание сообщения к сообщению
export async function createMessageToMessage({ text, authorId, threadId, emotionId, replyToMessageId }: TPostgresMessage) {
  return Message.create({ text, authorId, threadId, emotionId, replyToMessageId });
}

// Получение всех сообщений по id треда
export async function getMessages(threadId: number) {
  return Message.findAll({
    where: { threadId },
    include: [{
      model: User,
    }],
  });
}

// получение сообщений к сообщению (комментов)
export async function getMessagesToMessage(replyToMessageId: number) {
  return Message.findAll({
    where: {
      replyToMessageId,
    },
  });
}

export const handleGetMessagesByThread = (req: TReq, res: TRes) => {
  const { threadId } = req.params;
  const parsedThreadId = Number(threadId);
  if (Number.isNaN(parsedThreadId)) {
    res.status(404).send();
  }
  getMessages(parsedThreadId)
    .then((messages) => {
      res.status(200)
        .json(messages);
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
      res.status(200)
        .json(messages);
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
      res.status(200)
        .json(newMsg);
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
      res.status(200)
        .json(newMsg);
    })
    .catch(handleErrorReq(res));
};
