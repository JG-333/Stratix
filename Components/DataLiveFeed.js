import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

const DataLiveFeed = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    socket.on('datahub:new_record', (data) => {
      setRecords((prev) => [data, ...prev]);
    });

    return () => socket.off('datahub:new_record');
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl mb-4">Live Data Feed</h2>
      <ul>
        {records.map((record, idx) => (
          <li key={idx} className="border-b py-2">
            <strong>{record.scrapedData.title}</strong> <br />
            <small>{record.url}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataLiveFeed;
