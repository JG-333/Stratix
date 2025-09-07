import React, { useState } from 'react';
import { normalizeData } from '../../services/dataAlignService';

const DataNormalizer = ({ recordId, cleanedData }) => {
  const [normalizedData, setNormalizedData] = useState(null);

  const handleNormalize = async () => {
    try {
      const response = await normalizeData(recordId, cleanedData);
      setNormalizedData(response.data.normalizedData);
    } catch (err) {
      console.error('Normalization error:', err);
    }
  };

  return (
    <div className="mt-6">
      <button onClick={handleNormalize} className="bg-purple-500 text-white py-2 px-4 rounded">
        Normalize Data
      </button>

      {normalizedData && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Normalized Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(normalizedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataNormalizer;
