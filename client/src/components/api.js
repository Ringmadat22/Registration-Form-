// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace this with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
