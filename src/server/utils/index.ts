/* eslint-disable import/prefer-default-export */

import { Cookie } from 'set-cookie-parser';

export const cookiesToString = (cookies: Cookie[]) => {
  const result = `${cookies[1].name}=${cookies[1].value}; ${cookies[2].name}=${cookies[2].value}`;
  return result;
};
