import axios from 'axios';
import { BASE_URL } from './apis';

const request = async (method, url, data = {}, isMultiPart) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    let response = null;
    if (!isMultiPart) {
      response = await axiosInstance.request({
        url,
        method,
        data
      });
    } else {
      response = await fetch(BASE_URL + url, data);
    }
    console.log(`${url}`,response.data);
    return response.data;
  } catch (error) {
    console.log(`${url} Failed`, error);
    return false;
  }
};
export default request;
