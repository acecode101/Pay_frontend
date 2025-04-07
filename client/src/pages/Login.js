import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://pay-backend-dfok.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ margin: '2rem' }}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required /><br />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
