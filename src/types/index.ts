export type TRrequestOptions = {
  [key: string]: string | TRrequestOptions | TRequestData
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
