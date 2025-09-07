import React, { useState } from 'react';
import { loginUser, googleLogin, facebookLogin } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      dispatch(loginSuccess(data));
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      </form>
      <div className="flex flex-col gap-2 mt-6">
        <button onClick={googleLogin} className="p-2 bg-red-500 text-white rounded">Login with Google</button>
        <button onClick={facebookLogin} className="p-2 bg-blue-700 text-white rounded">Login with Facebook</button>
      </div>
    </div>
  );
};

export default Login;