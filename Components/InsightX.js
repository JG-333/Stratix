import React, { useState } from 'react';
import axios from 'axios';

const InsightX = () => {
  const [inputData, setInputData] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/insightX/analyze', { data: inputData.split(',').map(Number) });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error analyzing data:', error);
    }
  };

  return (
    <div>
      <h2>InsightX Data Analysis</h2>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter comma-separated numbers"
      />
      <button onClick={handleSubmit}>Analyze</button>
      {analysisResult && (
        <div>
          <h3>Analysis Results</h3>
          <p>Sum: {analysisResult.sum}</p>
          <p>Average: {analysisResult.average}</p>
          <p>Count: {analysisResult.count}</p>
        </div>
      )}
    </div>
  );
};

export default InsightX;
