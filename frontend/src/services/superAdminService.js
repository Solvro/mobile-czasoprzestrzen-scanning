import {instance} from './axiosConfig'; 

export async function createNewSuperAdminAccount(username, password, firstName, lastName, email, phone) {
  
    const data1 = {
        "password": password,
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": phone
    }
    try {
        const response = await instance.post(`super-admin/`, data1);
        return response.status;
    } catch (error) {
        return error.response.status;
    } 
}
