import {URL} from './serverURL';
const axios = require('axios');

export const instance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const newConfig = config;
  newConfig.headers.Authorization = token ? `Bearer ${localStorage.getItem('token')}` : ''
  return newConfig
})

instance.interceptors.response.use( undefined, (error) => {
 
  console.log(error.response.status+"ERROR");
  if (error.response.status === 401){
    window.history.go('/login');
   }
   else if(error.response.status === 404){
    window.history.go('/home');
  }
  else if(error.response.status === 500){
    window.history.go('/login');
  }
});