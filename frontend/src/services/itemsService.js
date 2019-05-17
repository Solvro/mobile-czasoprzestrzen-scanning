
import {instance} from './axiosConfig'; 

export async function getItemsList() {

  try {
    const getItem = await instance.get(`equipment/`);
    return getItem.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function addNewItemToItemList(itemName, itemType, itemDecription, itemRentTime) {

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

  try {
    const getItem = await instance.get(`equipment-type/`)
    return getItem.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}


export async function getItemViewFromId(id) {

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

  try {
    const getItem = await instance.delete(`equipment/` + id + '/');
    return getItem.status === 204;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function returnItem(id) {

  try {
    const getItem = await instance.put('equipment/'+id+'/admin-return/');
    return getItem.status === 200;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}