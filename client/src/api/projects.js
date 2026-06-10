import apiClient from './client';

export const getProjects = () => apiClient.get('/projects').then((res) => res.data);

export const createProject = (data) => apiClient.post('/projects', data).then((res) => res.data);

export const updateProject = (id, data) =>
  apiClient.put(`/projects/${id}`, data).then((res) => res.data);

export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);
