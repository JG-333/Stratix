import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SustainabilityDashboard = () => {
  const [sustainData, setSustainData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/api/ml/predict');
      const timestamp = new Date().toLocaleTimeString();
      const carbonEmission = (data.energy_consumption * 0.5).toFixed(2); 
      const sustainabilityScore = (100 - data.energy_consumption).toFixed(2); 

      const newRecord = {
        timestamp,
        energy_consumption: data.energy_consumption,
        carbon_emission: carbonEmission,
        sustainability_score: sustainabilityScore
      };

      setSustainData(prev => [...prev.slice(-9), newRecord]);

      // Suggestions
      const newSuggestions = [];
      if (data.energy_consumption > 80) newSuggestions.push("Consider scheduling maintenance to optimize energy usage.");
      if (sustainabilityScore < 30) newSuggestions.push("Switch to renewable energy sources where possible.");
      if (carbonEmission > 40) newSuggestions.push("Implement energy-saving protocols.");

      setSuggestions(newSuggestions);
    };

    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Sustainability Dashboard</h1>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">Energy Consumption (kWh)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sustainData}>
            <Line type="monotone" dataKey="energy_consumption" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-semibold mt-8 mb-2">Carbon Emission (kg CO₂)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sustainData}>
            <Line type="monotone" dataKey="carbon_emission" stroke="#ff7300" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-semibold mt-8 mb-2">Sustainability Score</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sustainData}>
            <Line type="monotone" dataKey="sustainability_score" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-8 p-4 bg-green-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Recommendations:</h2>
          {suggestions.length > 0 ? (
            <ul className="list-disc list-inside">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p>Energy usage is optimal. Great job!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;