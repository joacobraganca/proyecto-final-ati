import {
  PATIENTS_BY_HOME_ID,
  PATIENT_BY_ID,
  PATIENT_BY_NAME,
} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPatients = async () => {
  try {
    const home_id = await AsyncStorage.getItem('@healthhome_id');
    const token = await AsyncStorage.getItem('@auth_token');
    const response = await fetch(PATIENTS_BY_HOME_ID + '?_id=' + home_id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else {
      console.log(response);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getPatientById = id => {
  fetch(PATIENT_BY_ID + '?_id=' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const getPatientByName = name => {
  fetch(PATIENT_BY_NAME + '?name=' + name, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export {getPatients, getPatientById, getPatientByName};
