// import axios from 'axios';

const axios = require('axios');


export async function createNewAdminAccount(username, password, firstName, lastName, email, phone) {
  
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api-v1/',
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + localStorage.getItem('token')
        }
    });
  
    const data1 = {
        "password": password,
        "username": username,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": phone
    }
    alert(data1.password + " " + data1.username + " " + data1.email + " " + data1.phone)
    try {
     const response = await instance.post(`admin/`, data1);
     return response.status;
    } catch (error) {
     console.log(`Error: ${error}`);
    } 
}




