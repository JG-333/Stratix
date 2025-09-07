import React, { useState } from 'react';
import { ingestData } from '../../services/dataHubService';

const DataIngestForm = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ingestData(url);
      setMessage('Data ingestion started!');
      setUrl('');
    } catch (err) {
      console.error(err);
      setMessage('Error ingesting data');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Ingest Data from URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Ingest
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default DataIngestForm;
