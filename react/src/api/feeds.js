import axiosApi from './api';

const list = async () => {
  const response = await axiosApi.get('/feeds/');
  return response
};

const create = async (title) => {
  const response = await axiosApi.post('/feeds/', {title});
  return response
};

const remove = async (id) => {
  const response = await axiosApi.delete(`/feeds/${id}/`);
  return response
};

export default { list, create, remove }
