import axios from 'axios';

export const cleanData = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/api/dataalign/clean`, { data });
};

export const normalizeData = async (id, cleanedData) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/api/dataalign/normalize`, { id, cleanedData });
};

export const mapData = async (id, normalizedData, mappingRules) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/api/dataalign/map`, { id, normalizedData, mappingRules });
};
