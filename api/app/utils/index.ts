import express from 'express';

export type TRes = express.Response;

export const handleErrorReq = (res: TRes) => (error: any) => {
  res.status(500).send(error);
};
