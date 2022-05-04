import { TPostgresMessage } from 'types';
import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

// const url = 'http://localhost:8081';
const url = 'https://api:8081'; // container_name docker compose

export const getMessagesByThreadURL = '/message/';
export const createMessageURL = '/message';
export const createMessageToMessageURL = '/comment';
export const getMessagesByParentIdMessageURL = '/comment/';

// Создание сообщения
export async function createMessage({
  text,
  authorId,
  threadId,
  emotionId,
}: TPostgresMessage) {
  const res = await axios.post(`${url}${createMessageURL}`, {
    text,
    authorId,
    threadId,
    emotionId,
  }, { headers });
  return res;
}

// Создание сообщения к сообщению
export async function createMessageToMessage({
  text,
  authorId,
  threadId,
  emotionId,
  replyToMessageId,
}: TPostgresMessage) {
  const res = await axios.post(`${url}${createMessageToMessageURL}`, {
    text,
    authorId,
    threadId,
    emotionId,
    replyToMessageId,
  }, { headers });
  return res;
}

// Получение всех сообщений по id треда
export async function getMessages(threadId: number) {
  const res = await axios.get(`${url}${getMessagesByThreadURL}${threadId}`, { headers });
  return res;
}

// получение сообщений к сообщению (комментов)
export async function getMessagesToMessage(replyToMessageId: number) {
  const res = await axios.get(`${url}${getMessagesByParentIdMessageURL}${replyToMessageId}`, { headers });
  return res;
}
