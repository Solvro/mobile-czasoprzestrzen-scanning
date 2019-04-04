const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api-v1/unaccepted-client/',
//   timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Bearer ' + localStorage.getItem('token'),
  }
});

export async function getUnacceptedClientsList() {
    try {
        const verification = await instance.get();
        return verification.data;
    } catch (error) {
        return false;
    }
  }

export async function approveUnacceptedClient(id) {

    try {
        const verification = await instance.post(id+'/accept/');
        return verification.status === 200;
    } catch (error) {
        return false;
    }
}

export async function removeUnacceptedClient(id) {

    try {
        const verification = await instance.delete(id+'/');
        return verification.status === 204;
    } catch (error) {
        return false;
    }
}