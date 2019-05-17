import {instance} from './axiosConfig'; 

export async function getClientsList() {


    try {
        const response = await instance.get('client/');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function deleteClient(id) {


    try {
        const response = await instance.delete('client/' + id);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}