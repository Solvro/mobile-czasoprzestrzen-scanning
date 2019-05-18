import {instance} from './axiosConfig'; 

export async function getOngoingRentsList() {

    try {
        const response = await instance.get('rentalinfo/?status=ongoing');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function getFinishedRentsList() {

    try {
        const response = await instance.get('rentalinfo/?status=finished');
        return response.data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}
