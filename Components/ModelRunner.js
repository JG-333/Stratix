import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { processData } from '../../services/logicBoxService';

const socket = io(process.env.REACT_APP_API_URL);

const ModelRunner = () => {
  const [xInput, setXInput] = useState('');
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    socket.on('logicbox:processed', (data) => {
      setPrediction(data.processedResult.prediction);
    });

    return () => socket.off('logicbox:processed');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await processData({ x: parseFloat(xInput) });
    setXInput('');
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4">Run ML Model</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
          placeholder="Enter number"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Run
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Prediction:</h3>
          <p className="text-lg">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default ModelRunner;
