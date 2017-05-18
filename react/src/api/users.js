import axiosApi from './api';

const login = async (email, password) => {
  const response = await axiosApi.post('/users/login/', {email, password});
  return response
};

const logout = async () => {
  const response = await axiosApi.get('/users/logout/');
  return response
};

const register = async (email, password) => {
  const response = await axiosApi.post('/users/register/', {email, password});
  return response
};

const me = async () => {
  const response = await axiosApi.get('/users/me/');
  return response
};

export default { login, logout, register, me }
