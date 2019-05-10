const URL1 = 'http://51.38.135.139:8000/api-v1/';


const axios = require('axios');
const URL = URL1+'unaccepted-client/';

export async function getUnacceptedClientsList() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  try {
    const verification = await instance.get();
    return verification.data;
  } catch (error) {
    throw error;
  }
}

export async function approveUnacceptedClient(id) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  try {
    const verification = await instance.post(id + '/accept/');
    return verification.status === 200;
  } catch (error) {
    return false;
  }
}

export async function removeUnacceptedClient(id) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  try {
    const verification = await instance.delete(id + '/');
    return verification.status === 204;
  } catch (error) {
    return false;
  }
}