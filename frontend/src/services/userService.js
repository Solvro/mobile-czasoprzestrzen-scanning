// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth/',
  timeout: 1000,
});

export async function authorizeUser(username, password) {
  let data = {
    "password": "test",
    "email": "test@test.com"
  }

  let config = {
    headers: { 'Content-Type': 'application/json' }
  };
  return axios.post('http://localhost:1337/login', data, config)
}

export async function verifyUser(token) {
  try {
    // const verification = await instance.post(`/token/verify`, { token });
    const isVerify = localStorage.getItem(token) != '' /*verification && verification.status === 200;*/
    return isVerify;
  } catch (error) {
    return false;
  }
}