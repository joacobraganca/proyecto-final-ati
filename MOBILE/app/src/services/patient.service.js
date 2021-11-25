import {
  PATIENTS_BY_HOME_ID,
  PATIENT_BY_ID,
  PATIENT_BY_NAME,
} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPatientsByHome = async () => {
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
      return [];
    }
  } catch (error) {
    return [];
  }
};

const getPatientById = async id => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(PATIENT_BY_ID + '?_id=' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

const getPatientByName = async name => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(PATIENT_BY_NAME + '?name=' + name, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export {getPatientsByHome, getPatientById, getPatientByName};
