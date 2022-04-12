import axios from 'axios';
import { TPostgresUserInfo } from 'types';

export async function createUser(userData: TPostgresUserInfo) {
  const res = await axios.post('http://localhost:8080/user', userData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUserById(userId: string) {
  const res = await axios.post('http://localhost:8080/user/me', { userId }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function updateUserById(userId: string, data: TPostgresUserInfo) {
  const res = await axios.post('http://localhost:8080/user/update', data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUuidCookie(uuidCookie: string) {
  const res = await axios.post('http://localhost:8080/user/update', { uuidCookie }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}
