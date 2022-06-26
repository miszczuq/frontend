import { axiosInstance } from '../../../axiosInstance';
export const setInvoice = async data => {
  return axiosInstance
    .post(`/invoice`, data)
    .then(res => {
      if (res.status === 200) {
        console.log(res);
        return res;
      }
    })
    .catch(err => {
      return err.response;
    });
};
