// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:5000/auth/',
  timeout: 1000,
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
  
  // return axios.post(`http://localhost:8000/api-v1/login/`, data, config)
  try {
    const token = await axios.post(`http://localhost:8000/api-v1/login/`, data1, config);
    return token.data.access;
} catch (error) {
    console.log(`Error: ${error}`);
}
}

// export async function verifyUser(token) {

//   // const config = {
//   //   headers: {
//   //     'Authorization': 'Token ' + token
//   //   }
//   // };

//   // return axios.get('http://localhost:1337/status', config);
//   return token !== '';
// }

export async function verifyUser(token) {

  const data1 = {
    "token": token
  }
  try {
    console.log("HERE");
      const verification = await axios.post(`http://localhost:8000/api-v1/verify/`, data1, config);
      console.log("VERIFY",verification);
      const isVerify = verification && verification.status === 200;
      return isVerify;
  } catch (error) {
      return false;
  }
}