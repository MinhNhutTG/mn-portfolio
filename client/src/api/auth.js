import apiClient from './client';

export const login = (password) =>
  apiClient.post('/auth/login', { password }).then((res) => res.data);
