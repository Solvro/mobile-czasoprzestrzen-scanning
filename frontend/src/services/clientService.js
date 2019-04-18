const axios = require('axios');
const URL = 'http://localhost:8000/api-v1/';

export async function getClientsList() {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    try {
        const clients = await instance.get('client/');
        return clients.data;
    } catch (error) {
        console.log('Error: ${error}');
    }
}