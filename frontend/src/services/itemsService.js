const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api-v1/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Bearer ' + localStorage.getItem('token'),
  }
});

export async function addNewItemToItemList(itemName,itemType,itemDecription,itemRentTime) {
    const data = {
        "name": itemName,
        "description": itemDecription,
        "available": true,
        "type": 'Mic',
        "max_rent_time": itemRentTime
    }
    try {
      const addItem = await instance.post(`equipment/`, data);
      console.log(addItem.status);
      return addItem.status === 201;
    //   return isVerify;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }