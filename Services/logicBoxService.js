import axios from 'axios';

export const processData = async (inputData) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/api/logicbox/process`, { inputData });
};
