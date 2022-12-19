import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const $api = axios.create({
  baseURL: "",
});

$api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // 发送请求前做些什么
    return config;
  },
  (error) => {
    // 对请求失败做些什么
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    // 对响应成功做些什么
    return response;
  },
  (error) => {
    // 对响应失败做些什么
    return Promise.reject(error);
  }
);

export default $api;
