import { axiosInstance } from '../../../axiosInstance';
import { client } from '../../../mocks';

export const getClient = async clientId => {
  // const response = await axiosInstance.get(`/person/${clientId}`);
  // if (response.status === 200) {
  return client;
  // return response.data;
  // }
};
