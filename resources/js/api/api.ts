import axios from 'axios';

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: '/',
  withCredentials: true,
});

export async function initSanctum() {
  await api.get('/sanctum/csrf-cookie');
}
