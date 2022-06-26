import { axiosInstance } from '../../../axiosInstance';
export const getClient = async clientId => {
  return axiosInstance.get(`/person/${clientId}`)
      .then( (res)=> {
        if(res.status === 200){
          console.log(res)
          return res
        }
      }).catch( err =>{
        return err.response
      });
};
