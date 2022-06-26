import { axiosInstance } from '../../../axiosInstance';
export const getClient = async clientId => {
  const response = await axiosInstance.get(`/person/${clientId}`);
  if (response.status === 200) {
    return response.data;
  }
};
