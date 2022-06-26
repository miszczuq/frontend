import { axiosInstance } from '../../../axiosInstance';
import { game } from '../../../mocks';
export const getGame = async gameId => {
  // const response = await axiosInstance.get(`/game/${gameId}`);
  // if (response && response.status === 200) {
  // return response.data;
  return game;
};
