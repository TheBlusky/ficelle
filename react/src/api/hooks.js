import axiosApi from './api';

const list = async () => {
  const response = await axiosApi.get('/hooks/');
  return response
};

const create = async (title, type, feed, settings, frequency) => {
  const response = await axiosApi.post('/hooks/', {title, type, feed, settings, frequency});
  return response
};

const retrieve = async (id) => {
  const response = await axiosApi.get(`/hooks/${id}/`);
  return response
};

const remove = async (id) => {
  const response = await axiosApi.delete(`/hooks/${id}/`);
  return response
};

const patch = async (id, data) => {
  const response = await axiosApi.patch(`/hooks/${id}/`, data);
  return response
};

const getAvailableHooks = async (id) => {
  const response = await axiosApi.get(`/hooks/get_available_hooks/`);
  return response
};

export default { list, create, retrieve, remove, patch, getAvailableHooks }
