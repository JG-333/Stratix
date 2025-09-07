import React, { useState } from 'react';
import axios from 'axios';

const EcoIntel = () => {
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => setData(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/ecoIntel/monitor', { data: data.split(',').map(Number) });
      setResult(response.data);
    } catch (error) {
      console.error('Error monitoring environment:', error);
    }
  };

  return (
    <div>
      <h2>EcoIntel Environmental Monitoring</h2>
      <input
        type="text"
        value={data}
        onChange={handleInputChange}
        placeholder="Enter environmental data (e.g., pollution levels)"
      />
      <button onClick={handleSubmit}>Monitor</button>
      {result && (
        <div>
          <h3>EcoIntel Results</h3>
          <p>Pollution Level: {result.pollutionLevel}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
};

export default EcoIntel;
