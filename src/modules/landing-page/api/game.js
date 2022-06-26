import { axiosInstance } from '../../../axiosInstance';
export const getGame = async gameId => {
  return axiosInstance.get(`/game/${gameId}`)
      .then( (res)=> {
        if(res.status === 200){
            console.log(res)
          return res
        }
      }).catch( err =>{
        return err.response
      });
};