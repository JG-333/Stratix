import React, { useState } from 'react';
import axios from 'axios';

const CortexAI = () => {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/cortexAI/process', { data: inputData });
      setResult(response.data);
    } catch (error) {
      console.error('Error communicating with CortexAI:', error);
    }
  };

  return (
    <div>
      <h2>CortexAI Decision Making</h2>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter input data"
      />
      <button onClick={handleSubmit}>Process</button>
      {result && (
        <div>
          <h3>AI Result</h3>
          <p>{result.decision}</p>
          <p>Suggested action: {result.action}</p>
        </div>
      )}
    </div>
  );
};

export default CortexAI;
