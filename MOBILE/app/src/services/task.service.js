import {TASKS_BY_NURSE, UPDATE_TASK} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTasks = async () => {
  try {
    const id = await AsyncStorage.getItem('@user_id');
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(TASKS_BY_NURSE + '?_id=' + id, {
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
      console.log(response);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateTaskStatus = async (id, status) => {
  const token = await AsyncStorage.getItem('@auth_token');
  try {
    if (id !== '' && status !== '') {
      const response = await fetch(UPDATE_TASK + '?_id=' + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      if (response.status === 200) {
        return true;
      } else {
        console.log(response);
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {getTasks, updateTaskStatus};
