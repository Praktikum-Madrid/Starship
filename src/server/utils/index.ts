/* eslint-disable import/prefer-default-export */

import { Cookie } from 'set-cookie-parser';
import { TRes } from 'types';

export const cookiesToString = (cookies: Cookie[]) => {
  // console.log(cookies);
  const result = `${cookies[1].name}=${cookies[1].value}; ${cookies[2].name}=${cookies[2].value}`;
  return result;
};

export const handleErrorReq = (res: TRes) => (error: any) => {
  res.status(500).send(error);
};
