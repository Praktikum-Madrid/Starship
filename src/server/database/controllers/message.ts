import { TPostgresMessage } from 'types';
import { Message } from 'server/init';

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
  });
}

// получение сообщений к сообщению (комментов)
export async function getMessageToMessage(replyToMessageId: number) {
  return Message.findAll({
    where: {
      replyToMessageId,
    },
  });
}
