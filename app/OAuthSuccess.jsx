import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      dispatch(loginSuccess({ user: { id: payload.id }, token }));
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthSuccess;