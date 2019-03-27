// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth/',
  timeout: 1000,
});

export async function authorizeUser(username, password) {
  const data = {
    "password": "test",
    "email": "test@test.com"
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post('http://localhost:1337/login', data, config)
}

export async function verifyUser(token) {

  // const config = {
  //   headers: {
  //     'Authorization': 'Token ' + token
  //   }
  // };

  // return axios.get('http://localhost:1337/status', config);
  return token !== '';
}