import {instance} from './axiosConfig'; 

export async function getUnacceptedClientsList() {

  try {
    const verification = await instance.get('unaccepted-client/');
    return verification.data;
  } catch (error) {
    throw error;
  }
}

export async function approveUnacceptedClient(id) {

  try {
    const verification = await instance.post('unaccepted-client/'+id + '/accept/');
    return verification.status === 200;
  } catch (error) {
    return false;
  }
}

export async function removeUnacceptedClient(id) {

  try {
    const verification = await instance.delete('unaccepted-client/'+id + '/');
    return verification.status === 204;
  } catch (error) {
    return false;
  }
}