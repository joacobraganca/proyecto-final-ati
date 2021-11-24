import {HOSPITALS, PATHOLOGIES, EM_SERVICE, PART_SERVICE} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMisc = async URL => {
  try {
    const token = await AsyncStorage.getItem('@auth_token');

    const response = await fetch(URL, {
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

export {getMisc};
