import { PaletteMode } from '@mui/material';

import express from 'express';

import { RouteObject } from 'react-router-dom';

export type TRequestOptions = {
  [key: string]: string | TRequestOptions | TRequestData | boolean
};

export type TRequestData = Record<string, any> | null;

export type TCredintials = Record<string, string>;

export type TStore = Object;

type TIdUser = number | string;

type TLoginUser = string;

export type TUserInfo = {
  first_name: string,
  second_name: string,
  login: TLoginUser,
  email: string,
  phone: string,
  avatar?: string,
  display_name?: string,
  id?: TIdUser,
  userIdDB?: TIdUser,
}

export type TProfileData = TUserInfo;

export type TPostgresUserInfo = {
  id?: number,
  userId: TIdUser,
  uuid?: string,
  authCookie?: string,
  mode?: string,
  themeId?: number,
  login?: string, // нужен для отображения на форуме, чтобы не запрашивать автора для каждого сообщения по userId с апи яндекса
}

export type TForumData = {
  threads: TPostgresThread[],
  messages: TPostgresMessage[],
  emotions: TPostgresEmotion[],
  thread?: any,
}

export type TPostgresThread = {
  id?: number,
  name: string,
  text: string,
  authorId?: number,
  createdAt?: string,
}

export type TPostgresMessage = {
  id?: number,
  text: string,
  authorId?: number,
  threadId?: number,
  emotionId?: number,
  replyToMessageId?: number,
  createdAt?: string,
  User?: TPostgresUserInfo
}

export type TPostgresEmotion = {
  id?: number,
  htmlCode: string,
}

export type TPassword = {
  oldPassword: string,
  newPassword: string,
}

export interface ISprites {
  [key: string]: HTMLImageElement;
}

export type TPayload = Record<string, any>;

export type TUserState = {
  isLogined?: boolean,
  signInError?: string,
  isRegistered?: boolean,
  signUpError?: string,
}

export type TGameSettings = {
  isFullscreen?: boolean,
  score?: number,
  isGameStarted?: boolean,
  isGameQuited?: boolean,
}

export type TModeSettings = {
  mode: PaletteMode,
  city?: string,
  leader?: [],
}

export type TGameCallback = {
  toggleFullscreen: CallableFunction;
  gameEndWithWin: CallableFunction;
  gameEndWithLose: CallableFunction;
};

export interface FsDocument extends Document {
  webkitExitFullscreen: any;
  webkitFullscreenElement: Element | undefined;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
}

export interface FsDocumentElement extends HTMLElement {
  webkitRequestFullscreen: any;
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}

export type TReq = express.Request;
export type TRes = express.Response;
export type TNext = express.NextFunction;

export interface TReqWithUserData extends express.Request {
  userData?: any,
  isUserLogined?: boolean,
}

export type TUserLeaderboard = {
  data: {
    avatar?: string,
    rating: number,
    first_name: string,
    second_name: string,
  },
  ratingFieldName: string,
  teamName: string,
}

export type TTeamLeaderboard = {
  ratingFieldName: string,
  cursor: number,
  limit: number
}

export interface IMusic extends HTMLAudioElement {
  stop?: () => void;
}

export interface ISSRRouteObject extends RouteObject {
  loadData?: (...args: any) => any;
}

export interface IRouteObjectWithPrivacy extends RouteObject {
  isPrivate?: boolean;
}
