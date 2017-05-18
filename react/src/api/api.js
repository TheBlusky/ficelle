import axios from 'axios';

const axiosApi = axios.create({
  baseURL: "/api/",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken"
});

export default axiosApi