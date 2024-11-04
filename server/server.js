const axios = require('axios');
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();
const API_URL = process.env.API_URL || 'http://localhost:8000';

app.use(cookieParser());
app.use(express.json());


// act as a proxy for the login route, converting the response to an HTTP-only cookie
app.post('/api/login/token-pair', async (req, res) => {
  try {
    const { username, password } = req.body;
    const apiResponse = await axios.post(`${API_URL}/login/token-pair/`, { username, password });

    const { access, refresh } = apiResponse.data;

    // Set token as an HTTP-only cookie
    res.cookie('access_token', access, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 60 * 1000 // 30 minutes in milliseconds
    });
    
    res.cookie('refresh_token', refresh, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    return res.status(apiResponse.status).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


// act as a proxy for the refresh route, converting the response to an HTTP-only cookie
app.post('/api/login/access-token', async (req, res) => {
  try {
    const refreshToken = req.cookies['refresh_token'];
    const apiResponse = await axios.post(`${API_URL}/login/access-token/`, { refresh: refreshToken });

    const { access } = apiResponse.data;

    // Set token as an HTTP-only cookie
    res.cookie('access_token', access, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 60 * 1000 // 30 minutes in milliseconds
    });

    return res.status(apiResponse.status).json({ message: 'Access token refreshed' });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});


// Proxy for other /api requests, adding Authorization header from the cookie
app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    const token = req.cookies['access_token'];
    if (token) {
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
  }
}));


// Serve the React app's static files
app.use(express.static(path.join(__dirname, 'static')));

// Serve React app for all other routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

