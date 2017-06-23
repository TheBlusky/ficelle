import axiosApi from './api';

const list = async (search=undefined) => {
  if(typeof search === "undefined") {
    const response = await axiosApi.get('/items/');
    return response
  }
  else {
    const response = await axiosApi.get('/items/', {
      params: {search}
    });
    return response
  }
};

export default { list}
