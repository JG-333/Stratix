import axios from 'axios';

export const ingestData = async (url) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/api/datahub/ingest`, { url });
};
