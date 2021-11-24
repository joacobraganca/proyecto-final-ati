import {TASKS_BY_NURSE} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTasks = async () => {
  try {
    const id = await AsyncStorage.getItem('@user_id');
    const response = await fetch(TASKS_BY_NURSE + '?_id=' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
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

export {getTasks};
