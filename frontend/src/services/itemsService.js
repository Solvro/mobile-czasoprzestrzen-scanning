
const axios = require('axios');
const URL = 'http://localhost:8000/api-v1/';



export async function getItemsList() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });

  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    localStorage.removeItem('token');
    this.props.history.push('/login');
    return Promise.reject(error);
  });


  try {
    const getItem = await instance.get(`equipment/`);
    if(getItem.status === 401){
      await localStorage.removeItem('token');
      this.props.history.push('/login');
    }
    return getItem.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function addNewItemToItemList(itemName, itemType, itemDecription, itemRentTime) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });
  const data = {
    "name": itemName,
    "description": itemDecription,
    "available": true,
    "type": itemType,
    "max_rent_time": itemRentTime
  }
  try {
    const addItem = await instance.post(`equipment/`, data);
    console.log(addItem.status);
    return addItem.status === 201;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function addNewItemType(itemType) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });
  const data = {
    "type_name": itemType
  }
  try {
    const addItem = await instance.post(`equipment-type/`, data);
    console.log(addItem.status);
    return addItem.status === 201;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function getItemTypesList() {

  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });
  
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    console.log(error.response.status + "ERROR Status")
    if(error.response.status === 401){
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  });
  const getItem = await instance.get(`equipment-type/`)

  return getItem.data;
}


export async function getItemViewFromId(id) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });

  const getItem = await instance.get(`equipment/` + id + '/')
  .catch(function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }else if(error.response.status === 404){
      window.location = '/home';
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }    
});
return getItem.data;
}

export async function editItemData(id,itemName,itemType,itemDescription,itemRentTime) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });

  const data = {
    "name": itemName,
  "description": itemDescription,
  "available": true,
  "max_rent_time": itemRentTime,
  "type": itemType
  }

  try {
    const getItem = await instance.put(`equipment/` + id + '/', data);
    return getItem.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function removeItemFromList(id) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });

  try {
    const getItem = await instance.delete(`equipment/` + id + '/');
    return getItem.status === 204;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function returnItem(id) {
  const instance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });

  try {
    const getItem = await instance.put('equipment/'+id+'/admin-return/');
    return getItem.status === 200;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}