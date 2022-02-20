export type TRrequestOptions = {
  [key: string]: string | TRrequestOptions | TRequestData
};

export type TRequestData = Record<string, any>;

export type TCredintials = Record<string, string>;

export type TCoordinate = number;
