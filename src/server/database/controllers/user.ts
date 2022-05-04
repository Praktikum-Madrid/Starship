import axios from 'axios';
import { TPostgresUserInfo } from 'types';

const url = 'https://madrid-starship-11.ya-praktikum.tech';

export async function createUser(userData: TPostgresUserInfo) {
  const res = await axios.post(`${url}/api/user`, { userData }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUserById(userId: string) {
  const res = await axios.post(`${url}/api/user/me`, { userId }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function updateUserById(userId: string, data: TPostgresUserInfo) {
  const res = await axios.post(`${url}/api/user/update`, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUuidCookie(uuidCookie: string) {
  try {
    const res = await axios.post(`${url}/api/user/update`, { uuidCookie }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
