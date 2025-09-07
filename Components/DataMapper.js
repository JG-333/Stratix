import React, { useState } from 'react';
import { mapData } from '../../services/dataAlignService';

const DataMapper = ({ recordId, normalizedData }) => {
  const [mappingRules, setMappingRules] = useState('{}');
  const [mappedData, setMappedData] = useState(null);

  const handleMapping = async () => {
    try {
      const rules = JSON.parse(mappingRules);
      const response = await mapData(recordId, normalizedData, rules);
      setMappedData(response.data.mappedData);
    } catch (err) {
      console.error('Mapping error:', err);
    }
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full h-20 p-2 border mb-2"
        placeholder="Enter Mapping Rules JSON"
        value={mappingRules}
        onChange={(e) => setMappingRules(e.target.value)}
      />
      <button onClick={handleMapping} className="bg-indigo-500 text-white py-2 px-4 rounded">
        Map Data
      </button>

      {mappedData && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Mapped Data:</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(mappedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataMapper;
