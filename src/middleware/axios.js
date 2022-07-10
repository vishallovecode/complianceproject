import axios from "axios"; 
import { BASE_URL } from "../constants";

const AxiosInstance = axios.create({
  baseURL :BASE_URL,
  headers: {
     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': "application/json",
  }, 
});
AxiosInstance.interceptors.response.use(response => response, error => {
  const { response, config } = error

  if (response.status !== 401) {
    return Promise.reject(error)
  }

  // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
  return axios.get('/auth/refresh', {
    baseURL,
    timeout: 30000
  })
    .then(() => {
      // If you are using localStorage, update the token and Authorization header here
      return AxiosInstance(config)
    })
    .catch(() => {
      return Promise.reject(error)
    })
})
AxiosInstance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('authToken');
  config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});

export default AxiosInstance;