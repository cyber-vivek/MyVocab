import axios from 'axios';
import { toast } from 'react-toastify';
import {showLoader, hideLoader} from '../actions/loaderActions';
import store from '../store'
import { SOME_ERROR_OCCURED } from '../constants';

export const axiosHttp = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const axiosHttpNL = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

axiosHttp.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = token;
    store.dispatch(showLoader());
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.error('Unauthorized Access!');
      window.location.href = "/login";
      return;
    }
    toast.error(error?.response?.data?.error?._message || error?.response?.data?.message || SOME_ERROR_OCCURED);
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
)


axiosHttpNL.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = token;
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosHttpNL.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.error('Unauthorized Access!');
      window.location.href = "/login";
      return;
    }
    toast.error(error?.response?.data?.error?._message || error?.response?.data?.message || SOME_ERROR_OCCURED);
    return Promise.reject(error);
  }
)

export default axiosHttp;