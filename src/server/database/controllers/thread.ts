import { TPostgresThread } from 'types';
import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const url = 'https://madrid-starship-11.ya-praktikum.tech';

export const getThreadsURL = '/api/thread/all';
export const getThreadByIdURL = '/api/thread/';
export const createThreadURl = '/api/thread';
export const getEmotionsURL = '/api/emotion/all';

// Создание треда форума
export async function createThread({
  name,
  text,
  authorId,
}: TPostgresThread) {
  const res = await axios.post(`${url}${createThreadURl}`, {
    name,
    text,
    authorId,
  }, { headers });
  return res;
}

// Получение треда по ID
export async function getThreadById(id: number) {
  const res = await axios.get(`${url}${getThreadByIdURL}${id}`, { headers });
  return res;
}

// Получение всех тредов
export async function getAllThreads() {
  const res = await axios.get(`${url}${getThreadsURL}`, { headers });
  return res;
}

// Получение эмоций
export async function getEmotions() {
  const res = await axios.get(`${url}${getEmotionsURL}`, { headers });
  return res;
}
