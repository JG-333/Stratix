import React, { useState } from 'react';
import axios from 'axios';

const ReflexAI = () => {
  const [inputData, setInputData] = useState('');
  const [action, setAction] = useState(null);

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/reflexAI/process', { data: inputData });
      setAction(response.data.action);
    } catch (error) {
      console.error('Error processing reflex action:', error);
    }
  };

  return (
    <div>
      <h2>ReflexAI Real-time Action Processing</h2>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter input data (e.g., danger)"
      />
      <button onClick={handleSubmit}>Process</button>
      {action && (
        <div>
          <h3>ReflexAI Action</h3>
          <p>{action}</p>
        </div>
      )}
    </div>
  );
};

export default ReflexAI;
