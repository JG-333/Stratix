import React, { useState } from 'react';
import axios from 'axios';

const Opteris = () => {
  const [rawData, setRawData] = useState('');
  const [optimizedData, setOptimizedData] = useState(null);

  const handleInputChange = (e) => setRawData(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/opteris/optimize', { data: rawData.split(',') });
      setOptimizedData(response.data);
    } catch (error) {
      console.error('Error optimizing data:', error);
    }
  };

  return (
    <div>
      <h2>Opteris Data Optimization</h2>
      <input
        type="text"
        value={rawData}
        onChange={handleInputChange}
        placeholder="Enter comma-separated data"
      />
      <button onClick={handleSubmit}>Optimize</button>
      {optimizedData && (
        <div>
          <h3>Optimized Data</h3>
          <p>{optimizedData.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Opteris;
