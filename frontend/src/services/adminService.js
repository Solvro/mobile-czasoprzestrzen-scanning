import {instance} from './axiosConfig'; 

export async function createNewAdminAccount(username, password, firstName, lastName, email, phone) {
  
    const data1 = {
        "password": password,
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": phone
    }
    try {
        const response = await instance.post(`admin/`, data1);
        console.log(response.status);
        return response.status;
    } catch (error) {
        return error.response.status;
    } 
}


export async function getAdminList() {

    try {
        const getAdmin = await instance.get(`admin/`);
        return getAdmin.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function getSuperAdminList() {

    try {
        const getSuperAdmin = await instance.get(`super-admin/`);
        return getSuperAdmin.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function removeAdmin(id) {

    try {
        const verification = await instance.delete('admin/' + id + '/');
        return verification.status === 204;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
