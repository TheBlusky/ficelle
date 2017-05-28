import axiosApi from './api';

const list = async () => {
  const response = await axiosApi.get('/feeds/');
  return response
};

const create = async (title) => {
  const response = await axiosApi.post('/feeds/', {title});
  return response
};

const retrieve = async (id) => {
  const response = await axiosApi.get(`/feeds/${id}/`);
  return response
};

const remove = async (id) => {
  const response = await axiosApi.delete(`/feeds/${id}/`);
  return response
};

const patch = async (id, data) => {
  const response = await axiosApi.patch(`/feeds/${id}/`, data);
  return response
};

export default { list, create, retrieve, remove, patch }
