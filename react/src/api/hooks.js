import axiosApi from './api';

const list = async () => {
  const response = await axiosApi.get('/hooks/');
  return response
};

const create = async (title, type, feed, state_json, settings_json, frequency) => {
  const state = JSON.stringify(state_json);
  const settings = JSON.stringify(settings_json);
  const response = await axiosApi.post('/hooks/', {title, type, feed, state, settings, frequency});
  return response
};

const remove = async (id) => {
  const response = await axiosApi.delete(`/hooks/${id}/`);
  return response
};

const getAvailableHooks = async (id) => {
  const response = await axiosApi.get(`/hooks/get_available_hooks/`);
  return response
};

export default { list, create, remove, getAvailableHooks }
