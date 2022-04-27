import { TReq, TRequestData } from 'types';

// Парсит кукисы из реквеста. Возвращает объект кукисов или null
function ingetCookiesFromRequestdex(req: TReq | TRequestData) {
  const cookies = req?.headers.cookie;
  if (cookies) {
    const cookiesArray = cookies.split('; ');

    return cookiesArray.reduce((acc: Record<string, string>, item: string) => {
      const [name, value] = item.split('=');
      acc[name] = value;
      return acc;
    }, {});
  }

  return null;
}

export default ingetCookiesFromRequestdex;
