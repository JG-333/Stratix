import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/api/ml/predict');
      const timestamp = new Date().toLocaleTimeString();
      setAnalyticsData(prev => [...prev.slice(-9), { ...data, timestamp }]);
    };
    const interval = setInterval(fetchData, 3000); // fetch every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Predictive Analytics Dashboard</h1>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">Energy Consumption (kWh)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <Line type="monotone" dataKey="energy_consumption" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-semibold mt-8 mb-2">Downtime Risk</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="downtime_risk" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
