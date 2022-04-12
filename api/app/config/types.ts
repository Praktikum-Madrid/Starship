import express from 'express';

export type TReq = express.Request;
export type TRes = express.Response;
export type TNext = express.NextFunction;

export type TPostgresUserInfo = {
  id?: number,
  userId: number | string;
  uuid?: string,
  authCookie?: string,
  mode?: string,
  themeId?: number,
}

export type TPostgresThread = {
  id: number,
  name: string,
  text: string,
  authorId?: number,
  createdAt?: string,
}

export type TPostgresMessage = {
  id: number,
  text: string,
  authorId?: number,
  threadId?: number,
  emotionId?: number,
  replyToMessageId?: number,
  createdAt?: string,
}

export type TPostgresTheme = {
  id: number,
  name: string
}

export type TPostgresEmotion = {
  id: number,
  htmlCode: string,
}
