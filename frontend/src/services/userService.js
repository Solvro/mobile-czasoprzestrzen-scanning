// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
    timeout: 1000,
});

export async function authorizeUser(username, password) {
  let data = {
    "password": password,
    "username": username
  }

  let config = {
    headers: { 'Content-Type': 'application/json' }
  };
    try {
      axios.post('http://localhost:5000/auth/login', data, config)
      .then((response) => {
         console.log(response.data);
         
          return response.data.access_token;
    });
    
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function verifyUser(token) {
    try {
        const verification = await instance.post(`/token/verify`, { token });
        const isVerify = verification && verification.status === 200;
        return isVerify;
    } catch (error) {
        return false;
    }
}