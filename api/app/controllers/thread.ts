import { Thread, Emotion } from '../init';
import { TPostgresThread, TRes, TReq } from '../config/types';
import { handleErrorReq } from '../utils';

// Создание треда форума
export async function createThread({ name, text, authorId }: TPostgresThread) {
  return Thread.create({ name, text, authorId });
}

// Получение треда по ID
export async function getThreadById(id: number) {
  return Thread.findOne({ where: { id } });
}

// Получение всех тредов
export async function getAllThreads() {
  return Thread.findAll();
}

// получение эмоций
export async function getAllEmotions() {
  return Emotion.findAll();
}

// Получение всех тредов по id автора
export async function getThreadsByAuthor(authorId: number) {
  return Thread.findAll({
    where: { authorId },
  });
}

export const handleGetThreads = (req: TReq, res: TRes) => {
  getAllThreads()
    .then((threads) => {
      res.status(200)
        .json(threads);
    })
    .catch(handleErrorReq(res));
};

export const handleGetThreadById = (req: TReq, res: TRes) => {
  const { id } = req.params;
  const parsedId = Number(id);
  if (Number.isNaN(parsedId)) {
    res.status(404).send();
  }
  getThreadById(parsedId)
    .then((thread) => {
      res.status(200)
        .json(thread);
    })
    .catch(handleErrorReq(res));
};

export const handleGetEmotions = (req: TReq, res: TRes) => {
  getAllEmotions()
    .then((emotions) => {
      res.status(200)
        .json(emotions);
    })
    .catch(handleErrorReq(res));
};

export const handleCreateThread = (req: TReq, res: TRes) => {
  const {
    name,
    text,
    authorId,
  } = req.body;
  createThread({
    name,
    text,
    authorId,
  })
    .then((newThread) => {
      res.status(200)
        .json(newThread);
    })
    .catch(handleErrorReq(res));
};
