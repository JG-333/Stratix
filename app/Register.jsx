import React, { useState } from 'react';
import { registerUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate('/login');
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Register</button>
      </form>
    </div>
  );
};

export default Register;