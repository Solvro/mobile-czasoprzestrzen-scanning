const axios = require('axios');
const URL = 'http://localhost:8000/api-v1/';

export async function getOngoingRentsList() {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    try {
        const response = await instance.get('rentalinfo/?status=ongoing');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function getFinishedRentsList() {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    try {
        const response = await instance.get('rentalinfo/?status=finished');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}
