const axios = require('axios');
const jwtDecode = require('jwt-decode').jwtDecode;
require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
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
    const apiResponse = await axios.post(`${API_URL}/api/login/token-pair/`, { username, password });

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

    const decoded = { access: jwtDecode(access), refresh: jwtDecode(refresh) };
    return res.status(apiResponse.status).json(decoded);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid credentials." });
  }
});


// act as a proxy for the refresh route, converting the response to an HTTP-only cookie
app.post('/api/login/access-token', async (req, res) => {
  try {
    const refreshToken = req.cookies['refresh_token'];
    const apiResponse = await axios.post(`${API_URL}/api/login/access-token/`, { refresh: refreshToken });

    const { access } = apiResponse.data;

    // Set token as an HTTP-only cookie
    res.cookie('access_token', access, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 30 * 60 * 1000 // 30 minutes in milliseconds
    });

    const decoded = { access: jwtDecode(access) };
    return res.status(apiResponse.status).json(decoded);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});


app.delete('/api/login/token-pair', (_req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.status(200).json({ message: 'Logout successful' });
});


app.use('/api', proxy(API_URL, {
  proxyReqPathResolver: function(req) {
    return '/api' + req.url;
  },
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    const token = srcReq.cookies['access_token'];
    if (token) {
      proxyReqOpts.headers['jwtAuth'] = `Bearer ${token}`;
    }
    return proxyReqOpts;
  }
}));


// Serve the React app's static files
app.use(express.static(path.join(__dirname, 'static')));

// Serve React app for all other routes
app.get('*', (_req, res) => {
  console.log('Serving React app');
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

