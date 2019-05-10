const URL = 'http://51.38.135.139:8000/api-v1/';

const axios = require('axios');


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
        const response = await instance.get('client/');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function deleteClient(id) {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    try {
        const response = await instance.delete('client/' + id);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}