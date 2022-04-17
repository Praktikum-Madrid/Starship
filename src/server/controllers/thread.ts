/* eslint-disable camelcase */
import { TReq, TRes } from 'types';
import { createThread, getAllThreads, getEmotions, getThreadById } from 'server/database/controllers/thread';
import { handleErrorReq } from 'server/utils';

export const handleGetThreads = (req: TReq, res: TRes) => {
  getAllThreads()
    .then((threads) => {
      res.status(threads.status)
        .send(threads.data);
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
      res.status(thread.status)
        .send(thread.data);
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
      res.status(newThread.status)
        .send(newThread.data);
    })
    .catch(handleErrorReq(res));
};

export const handleGetEmotions = (req: TReq, res: TRes) => {
  getEmotions()
    .then((emotions) => {
      res.status(emotions.status)
        .send(emotions.data);
    })
    .catch(handleErrorReq(res));
};
