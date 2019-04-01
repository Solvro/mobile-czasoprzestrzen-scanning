// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api-v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export async function authorizeUser(username, password) {
  const data1 = {
    "password": password,
    "username": username
  }
  try {
    const token = await instance.post(`login/`, data1);
    return token.data.access;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function verifyUser(token) {

  const data1 = {
    "token": token
  }
  try {
      const verification = await instance.post(`verify/`, data1);
      const isVerify = verification && verification.status === 200;
      return isVerify;
  } catch (error) {
      return false;
  }
}