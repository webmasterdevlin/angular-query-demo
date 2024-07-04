import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

api.interceptors.request.use((config: any) => {
  // do something before request is sent
  const token = localStorage.getItem('token');
  if (token && token.length) {
    config.headers['token'] = token;
  }
  return config;
});

export const EndPoints = {
  contacts: 'contacts',
} as const;

export type EndPointsKeys = keyof typeof EndPoints;
