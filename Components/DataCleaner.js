import React, { useState } from 'react';
import { cleanData } from '../../services/dataAlignService';

const DataCleaner = () => {
  const [inputData, setInputData] = useState('');
  const [cleanedData, setCleanedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(inputData);
      const response = await cleanData(jsonData);
      setCleanedData(response.data.cleanedData);
    } catch (err) {
      console.error('Cleaning error:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4">Clean Raw Data</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-40 p-2 border mb-2"
          placeholder="Paste JSON data"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Clean
        </button>
      </form>

      {cleanedData && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Cleaned Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(cleanedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataCleaner;
