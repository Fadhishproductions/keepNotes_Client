import React, { useState } from 'react';
import { useLoginUserMutation, useGoogleLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({
        token: res.token,
        user: res.user
      }));
      toast.success('Login successful!')

    } catch (err) {
      toast.error(err.data?.message || 'Login failed!')
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await googleLogin(response.credential).unwrap();
      dispatch(setCredentials({
        token: res.token,
        user: res.user
      }));
      toast.success('Google login successful!');
    } catch (err) {
      toast.error(err.data?.message || 'Google login failed!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2 style={{textAlign:'center'}}>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" disabled={isLoading} style={{ width: '100%' }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <GoogleOAuthProvider clientId='624020306715-vn15ckt4ulh78edq2qa2o10p1svgpi46.apps.googleusercontent.com'>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google login failed')}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
1