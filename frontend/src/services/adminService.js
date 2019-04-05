// import axios from 'axios';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api-v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});


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
    return response.data.access;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function changePassword(oldPassword, newPassword) {
    const data1 = {
      "old_password": oldPassword,
      "new_password": newPassword,
    }
    try {
      const response = await instance.post(`change-password/`, data1);
      return response.data.access;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }



