import axiosApi from './api';

const list = async () => {
  const response = await axiosApi.get('/items/');
  return response
};

export default { list}
