import { axiosInstance } from '../../../axiosInstance';
export const addSell = async data => {
    return axiosInstance
        .post(`/sell`, data)
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
