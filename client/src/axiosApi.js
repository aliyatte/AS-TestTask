import axios from 'axios';
import config from "./config";
import store from './store/configureStore';

const axiosApi = axios.create({
  baseURL: config.apiURL
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
  } catch (e) {
    // do nothing
  }

  return config;
});

axiosApi.interceptors.response.use(res => res,
  error => {
    if (!error.response) {
      error.response = {data: {global: 'No connection to server'}};
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  });

export default axiosApi;