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

export {getTasks};
