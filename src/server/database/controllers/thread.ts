import { Thread } from 'server/init';
import { TPostgresThread } from 'types';

// Создание треда форума
export async function createThread({ name, text, authorId }: TPostgresThread) {
  return Thread.create({ name, text, authorId });
}

// Получение треда по ID
export async function getThreadsById(id: number) {
  return Thread.findOne({ where: { id } });
}

// Получение всех тредов
export async function getAllThreads() {
  return Thread.findAll();
}

// Получение всех тредов по id автора
export async function getThreadsByAuthor(authorId: number) {
  return Thread.findAll({
    where: { authorId },
  });
}
