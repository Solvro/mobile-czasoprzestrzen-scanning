const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api-v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});


export async function authorizeUser(username, password) {
  const data1 = {
    "password": password,
    "username": username
  }
  try {
    const token = await instance.post(`login/`, data1);
    return token.data.access;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function verifyUser(token) {

  const data = {
    "token": token
  }
  try {
      const verification = await instance.post(`verify/`, data);
      const isVerify = verification && verification.status === 200;
      return isVerify;
  } catch (error) {
      return false;
  }
}

export async function getUserName(token) {
  const data = {
    "token": token
  }
  try {
      const user = await instance.post(`verify/`, data);
      return user.data.username;
  } catch (error) {
      return "?";
  }
}

export async function changePassword(oldPassword, newPassword) {

  const instance = axios.create({
      baseURL: 'http://localhost:8000/api-v1/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage.getItem('token')
      }
   });

  const data1 = {
      "old_password": oldPassword,
      "new_password": newPassword,
  }
  try {
      const response = await instance.post(`change-password/`, data1);
      return response.status;
  } catch (error) {
      return error.response.status;
  }
}


export async function resetPassword(email) {
  const data = {
    "email": email
  }
  try {
      const user = await instance.post(`reset-password/`, data);
      return user.status === 200;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function resetPasswordConfirm(token, password) {
  const data = {
    "token": token,
    "password": password
  }
  try {
      const user = await instance.post(`reset-password/confirm/`, data);
      return user.status === 200;
  } catch (error) {
    console.log(error.status)
    console.log(`Error: ${error}`);
  }
}


export async function userSuperAdmin() {

  const data = {
    "token": localStorage.getItem('token')
  }
  try {
      const verification = await instance.post(`verify/`, data);
      console.log("VER"+verification.data.type);
      return verification.data.type === "Sa";
  } catch (error) {
      return false;
  }

}



