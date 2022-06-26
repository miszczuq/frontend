import axios from 'axios';
import { environment } from './environment';
export const axiosInstance = axios.create({
  baseURL: environment.baseURL,
});
