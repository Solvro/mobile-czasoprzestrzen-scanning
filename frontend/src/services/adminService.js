const axios = require('axios');
const URL = 'http://localhost:8000/api-v1/';


export async function getAdminList() {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });

    try {
        const getAdmin = await instance.get(`admin/`);
        return getAdmin.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function getSuperAdminList() {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });

    try {
        const getSuperAdmin = await instance.get(`super-admin/`);
        console.log(getSuperAdmin.data)
        return getSuperAdmin.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function removeAdmin(id) {
    const instance = axios.create({
        baseURL: URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });

    try {
        const verification = await instance.delete('admin/' + id + '/');
        return verification.status === 204;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}