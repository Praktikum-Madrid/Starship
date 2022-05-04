import axios from 'axios';
import { TPostgresUserInfo } from 'types';

// const url = 'http://localhost:8081';
// const url = 'api:8081'; // container_name docker compose
const url = 'https://api:8081'; // container_name docker compose

export async function createUser(userData: TPostgresUserInfo) {
  const res = await axios.post(`${url}/user`, { userData }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUserById(userId: string) {
  const res = await axios.post(`${url}/user/me`, { userId }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function updateUserById(userId: string, data: TPostgresUserInfo) {
  const res = await axios.post(`${url}/user/update`, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function getUuidCookie(uuidCookie: string) {
  try {
    const res = await axios.post(`${url}/user/update`, { uuidCookie }, {
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
