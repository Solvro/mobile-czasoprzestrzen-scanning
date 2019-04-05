const axios = require('axios');

export async function getUnacceptedClientsList() {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api-v1/unaccepted-client/',
          timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem('token')
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
        baseURL: 'http://localhost:8000/api-v1/unaccepted-client/',
          timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem('token')
        }
      });
    try {
        const verification = await instance.post(id+'/accept/');
        return verification.status === 200;
    } catch (error) {
        return false;
    }
}

export async function removeUnacceptedClient(id) {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api-v1/unaccepted-client/',
          timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem('token')
        }
      });
    try {
        const verification = await instance.delete(id+'/');
        return verification.status === 204;
    } catch (error) {
        return false;
    }
}