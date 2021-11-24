import {TASKS} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTasks = id => {
  fetch(TASKS + '?_id=' + id, {
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

const getTasks = async (user, password, setError) => {
  try {
    const response = await fetch(TASKS + '?_id=' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      AsyncStorage.setItem('@auth-token', response.headers.map.authorization);
      const json = await response.json();
      AsyncStorage.setItem('@user-id', json._id);
      AsyncStorage.setItem('@healthhome-id', json.assignedHealthHome);
      setError(false);
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {getTasks};
