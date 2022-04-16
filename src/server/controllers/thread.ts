/* eslint-disable camelcase */
import { TReq, TRes } from 'types';
import { createThread, getAllThreads, getThreadById } from 'server/database/controllers/thread';
import { handleErrorReq } from 'server/utils';

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

export const handleCreateThread = (req: TReq, res: TRes) => {
  const {
    name,
    text,
    authorId,
  } = req.body;
  // TODO authorId не должен приходить?? надо брать id юзера который в системе залогинен
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
