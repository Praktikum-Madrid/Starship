import { PaletteMode } from '@mui/material';

import express from 'express';

export type TRequestOptions = {
  [key: string ]: string | TRequestOptions | TRequestData | boolean
};

export type TRequestData = Record<string, any>;

export type TCredintials = Record<string, string>;

export type TCoordinate = number;

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
  display_name: string,
  id?: TIdUser,
}

export type TPassword = {
  oldPassword: string,
  newPassword: string,
}

export interface ISprites {
  [key: string]: HTMLImageElement;
}

export interface IAudio {
  [key: string]: HTMLAudioElement | null;
}

export type TPayload = Record<string, any>;

export type TLocationState = {
  from: {
    pathname: string;
  }
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
}

export type TGameCallback = {
  toggleFullscreen: CallableFunction;
  gameEndWithWin: CallableFunction;
  gameEndWithLose: CallableFunction;
};

export interface FsDocument extends HTMLDocument {
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
